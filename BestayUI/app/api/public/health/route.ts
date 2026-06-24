import { parseRequestUrl } from "@/app/lib/api/parse-request-url";

export async function GET(request: Request) {
  const parsedRequestUrl = parseRequestUrl(request.url);
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/${parsedRequestUrl}`,
  );

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
