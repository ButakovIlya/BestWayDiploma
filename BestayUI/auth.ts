import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { UserDTO } from "./app/types/entities";

async function getUser(phone: string, code: string): Promise<User | undefined> {
  const backendApiUrl = process.env.BACKEND_API_URL;
  if (!backendApiUrl) {
    console.error("BACKEND_API_URL is not configured.");
    return undefined;
  }

  try {
    const res = await fetch(`${backendApiUrl}/public/auth/check-code`, {
      method: "POST",
      body: JSON.stringify({
        phone,
        code,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.error("Backend check-code failed:", res.status, await res.text());
      return undefined;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return undefined;
  }
}

async function getUserProfile(
  access_token: string,
): Promise<UserDTO | undefined> {
  const backendApiUrl = process.env.BACKEND_API_URL;
  if (!backendApiUrl || !access_token) {
    return undefined;
  }

  try {
    const res = await fetch(`${backendApiUrl}/public/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!res.ok) {
      console.error("Backend profile request failed:", res.status, await res.text());
      return undefined;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return undefined;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (!user) {
        return token;
      }

      return {
        ...token,
        is_admin: Boolean(user.is_admin),
        is_new_user: Boolean(user.is_new_user),
        access_token: user.access_token,
        refresh_token: user.refresh_token,
      };
    },
  },
  providers: [
    Credentials({
      name: "phone",
      credentials: { phone: { type: "text" }, code: { type: "text" } },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ phone: z.string(), code: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { phone, code } = parsedCredentials.data;
          const user = await getUser(phone, code);

          if (!user?.status) return null;
          const userProfile = await getUserProfile(user.access_token ?? "");

          return {
            access_token: user.access_token,
            refresh_token: user.refresh_token,
            is_admin: userProfile?.is_admin,
            is_new_user: user.is_new_user,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});
