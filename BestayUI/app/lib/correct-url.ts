export const correctUrl = (url: string) => {
  if (!url) {
    return url;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const origin = (process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "").replace(
    /\/$/,
    "",
  );
  const path = url.startsWith("/") ? url : `/${url}`;

  return `${origin}${path}`;
};
