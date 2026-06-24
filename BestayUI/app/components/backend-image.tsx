import { correctUrl } from "@/app/lib/correct-url";
import { cn } from "@/app/lib/utils";

type BackendImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height"
> & {
  src?: string | null;
  width?: number;
  height?: number;
  fill?: boolean;
};

function resolveImageSrc(src?: string | null): string | undefined {
  if (!src) {
    return undefined;
  }

  if (src.startsWith("blob:") || src.includes("unsplash.com")) {
    return src;
  }

  return correctUrl(src);
}

export function BackendImage({
  src,
  alt = "",
  className,
  width,
  height,
  fill,
  style,
  ...props
}: BackendImageProps) {
  const resolvedSrc = resolveImageSrc(src);

  if (!resolvedSrc) {
    return null;
  }

  if (fill) {
    return (
      <img
        src={resolvedSrc}
        alt={alt}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
        style={style}
        {...props}
      />
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      {...props}
    />
  );
}
