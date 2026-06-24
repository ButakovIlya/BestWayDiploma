import { AuthContext } from "@/app/types";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

type Handler = (req: NextRequest, context: AuthContext) => Promise<Response>;

export function withAuth(handler: Handler): Handler {
  return async (req) => {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET ?? "",
      cookieName:
        process.env.NODE_ENV === "production"
          ? "__Secure-authjs.session-token"
          : "authjs.session-token",
    });

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // If authenticated, call the original handler
    return handler(req, {
      params: new Promise(() => {
        String(token.access_token);
      }),
    });
  };
}
