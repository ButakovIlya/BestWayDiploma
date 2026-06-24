export const correctUrl = (url: string) => {
  const sliceEdge = url.includes("http") ? 3 : 0;
  const urlParts = url.split("/").slice(sliceEdge);
  urlParts.unshift(process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "");
  const newUrl = urlParts.join("/");

  return newUrl;
};
