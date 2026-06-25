import { Toaster } from "../components/ui/sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Toaster theme="light" position="top-center" richColors />
    </>
  );
}
