import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guest Feedback | Comfy Inn Eldoret",
  description: "Share your stay experience with Comfy Inn Eldoret.",
  generator: "Kelvin Koech",
  icons: {
    icon: [
      {
        url: "/logo.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo.jpeg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#f8faec]">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
