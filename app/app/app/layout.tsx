import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Teacher | Teaching Management Platform",
  description: "Plan better, teach smarter, and make learning more meaningful.",
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
