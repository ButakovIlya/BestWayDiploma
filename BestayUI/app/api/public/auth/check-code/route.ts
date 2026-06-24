import { parseRequestUrl } from "@/app/lib/api/parse-request-url";

export async function POST(request: Request) {
  const parsedRequestUrl = parseRequestUrl(request.url);

  const body = await request.json();
  const { phone, code } = body;

  const response = await fetch(
    `${process.env.BACKEND_API_URL}/${parsedRequestUrl}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, code }),
    },
  );

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
