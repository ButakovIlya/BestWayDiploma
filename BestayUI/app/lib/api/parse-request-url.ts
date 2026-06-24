export const parseRequestUrl = (path: string) => {
  return path.split("/").slice(4).join("/");
};
