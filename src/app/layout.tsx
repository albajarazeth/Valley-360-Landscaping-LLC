import type { Metadata, Viewport } from "next";
import { Barlow, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Valley 360 Landscaping LLC | Landscaping McAllen TX",
  description:
    "Valley 360 Landscaping LLC provides premium landscaping in McAllen, TX including irrigation, hardscaping, and RGV lawn care services.",
  keywords: [
    "Landscaping McAllen TX",
    "RGV Lawn Care",
    "Irrigation McAllen",
    "Hardscaping McAllen",
    "Valley 360 Landscaping LLC",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
