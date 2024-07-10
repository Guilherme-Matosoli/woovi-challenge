import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Woovi Challenge",
  description: "Woovi vacancy challange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
