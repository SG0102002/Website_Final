import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import { ChatWidget } from '@/components/ChatWidget';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Radixs - CAD to BIM Conversion & Digital Construction Solutions",
  description: "Professional CAD to BIM conversion services for architecture and engineering firms. Transform 2D CAD drawings into intelligent 3D Building Information Models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <ChatWidget />
        <Toaster position="bottom-right" theme="light" richColors />
      </body>
    </html>
  );
}
