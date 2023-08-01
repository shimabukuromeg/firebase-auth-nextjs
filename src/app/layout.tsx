import SessionProvider from "@/provider/SessionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="ja">
        <head />
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}
