import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { parseRequestUrl } from "@/app/lib/api/parse-request-url";

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? "",
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });
  console.log(token?.access_token);
  const parsedRequestUrl = parseRequestUrl(request.url);
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/${parsedRequestUrl}`,
    {
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
    },
  );

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request: Request) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? "",
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  const parsedRequestUrl = parseRequestUrl(request.url);
  const body = await request.json();

  const response = await fetch(
    `${process.env.BACKEND_API_URL}/${parsedRequestUrl}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
