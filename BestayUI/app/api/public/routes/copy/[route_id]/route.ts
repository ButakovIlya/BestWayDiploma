import { parseRequestUrl } from "@/app/lib/api/parse-request-url";
import { getToken } from "next-auth/jwt";

export async function POST(request: Request) {
  const parsedRequestUrl = parseRequestUrl(request.url);

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? "",
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  await fetch(`${process.env.BACKEND_API_URL}/${parsedRequestUrl}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.access_token}`,
    },
  });

  return new Response(JSON.stringify({}), {
    headers: { "Content-Type": "application/json" },
  });
}
