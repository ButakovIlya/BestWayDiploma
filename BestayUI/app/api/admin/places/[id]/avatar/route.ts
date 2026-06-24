import { parseRequestUrl } from "@/app/lib/api/parse-request-url";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const parsedRequestUrl = parseRequestUrl(request.url);
  const body = await request.formData();

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? "",
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  const response = await fetch(
    `${process.env.BACKEND_API_URL}/${parsedRequestUrl}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
      body,
    },
  );

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
