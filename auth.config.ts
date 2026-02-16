import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const authOn = process.env.AUTH_ON === "true"; // Check if auth is enabled via environment variables
      if (authOn) {
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }
      return true; // Allow access to all pages if auth is disabled
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
