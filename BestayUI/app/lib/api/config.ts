export function getBackendOrigin(): string {
  const origin = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "");
  if (!origin) {
    throw new Error("NEXT_PUBLIC_BACKEND_API_URL is not configured.");
  }
  return origin;
}

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getBackendOrigin()}${normalizedPath}`;
}
