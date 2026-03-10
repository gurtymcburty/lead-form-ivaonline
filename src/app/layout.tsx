import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IVA Online",
  description: "Find out if you qualify for an IVA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
