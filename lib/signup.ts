import z from "zod";
import bcrypt from "bcryptjs";
import { sqlConn } from "@/lib/db";

export const SignupFormSchema = z
  .object({
    name: z.string().min(1, { error: "Name is required" }).trim(),
    email: z.email({ error: "Invalid email address" }).trim(),
    password: z
      .string()
      .min(8, { error: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
      .regex(/[0-9]/, { error: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        error: "Contain at least one special character.",
      }),
    confirmPassword: z
      .string()
      .min(8, { error: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
      .regex(/[0-9]/, { error: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        error: "Contain at least one special character.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormState =
  | {
      errors?: {
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
      };
      message?: string;
    }
  | undefined;

export async function signup(state: SignupFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sqlConn`
        INSERT INTO users (name, email, password, account_enabled)
        VALUES (${name}, ${email}, ${hashedPassword}, false)
      `;
  } catch (error) {
    return {
      message: "Failed to create account.",
    };
  }
}
