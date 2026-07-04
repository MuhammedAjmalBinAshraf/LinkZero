import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "Link Zero — The Wireless USB Bridge",
  description:
    "Turn any wired USB device wireless. Link Zero is an open-source hardware dongle powered by ESP32-S3. Open Hardware. Zero Profit. Factory direct at cost.",
  keywords: [
    "Link Zero",
    "wireless USB",
    "USBip",
    "ESP32-S3",
    "open hardware",
    "open source",
    "USB over WiFi",
    "wireless HID",
  ],
  authors: [{ name: "Link Zero Contributors" }],
  openGraph: {
    title: "Link Zero — The Wireless USB Bridge",
    description:
      "Turn any wired USB device wireless. Open Hardware. Zero Profit.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Link Zero — The Wireless USB Bridge",
    description: "Open Hardware. Zero Profit. Factory direct at cost.",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-void antialiased">{children}</body>
    </html>
  );
}
