import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { sqlConn } from "@/lib/db";
import * as schema from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq, and } from "drizzle-orm";

export const auth = betterAuth({
  database: drizzleAdapter(sqlConn, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  emailAndPassword: {
    enabled: true,
    password: {
      async hash(password) {
        // Return undefined to use better-auth's default scrypt for new signups
        return undefined as any;
      },
      async verify({ hash, password }) {
        // Detect legacy bcrypt hashes by their prefix
        if (hash.startsWith("$2b$") || hash.startsWith("$2a$")) {
          const valid = await bcrypt.compare(password, hash);
          if (valid) {
            // Silently re-hash with scrypt and update the account table
            // so this user gets a modern hash going forward
            const { generateId } = await import("better-auth");
            const newHash =
              await auth.options.emailAndPassword!.password!.hash!(password);
            await sqlConn
              .update(schema.account)
              .set({ password: newHash, updatedAt: new Date() })
              .where(
                and(
                  eq(schema.account.providerId, "credential"),
                  eq(schema.account.password, hash),
                ),
              );
          }
          return valid;
        }
        // Not a bcrypt hash, return undefined to fall through to
        // better-auth's default scrypt verify
        return undefined as any;
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        async before(user) {
          if (process.env.APPROVE_SIGNUPS?.toLowerCase() === "true") {
            return {
              data: {
                ...user,
                banned: true,
                banReason: "Pending admin approval",
              },
            };
          }
          // No modification, return undefined to proceed normally
        },
      },
    },
  },

  plugins: [
    admin({
      defaultRole: "user",
      bannedUserMessage:
        process.env.APPROVE_SIGNUPS === "true"
          ? "Your account has not been approved yet. Please contact the administrator."
          : "Your account has been banned. Please contact the administrator.",
    }),
  ],

  user: {
    fields: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      emailVerified: "emailVerified",
    },
    additionalFields: {
      accountEnabled: {
        type: "boolean",
        defaultValue: true,
        fieldName: "accountEnabled",
      },
    },
  },

  advanced: {
    generateId: () => crypto.randomUUID(),
    useSecureCookies: process.env.NODE_ENV === "production",
  },

  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
