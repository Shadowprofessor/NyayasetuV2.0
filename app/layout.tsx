import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import DemoBanner from "@/components/layout/DemoBanner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: {
    template: "%s | NyayaSetu – Bridging the Gap for Delhi's Citizens",
    default: "NyayaSetu | Discover Welfare Schemes & File Civic Complaints",
  },
  description: "NyayaSetu is Delhi's smart civic portal. Discover eligible government welfare schemes instantly, file local complaints with OTP verification, and track everything with live SLA timers.",
  keywords: ["Delhi", "welfare schemes", "civic complaints", "NyayaSetu", "government portal", "RWA", "field officers"],
  openGraph: {
    title: "NyayaSetu | Discover Welfare Schemes & File Civic Complaints",
    description: "Delhi's smartest civic portal. Discover eligible government welfare schemes instantly and file local complaints.",
    url: "https://nyayasetu.example.com",
    siteName: "NyayaSetu",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DemoBanner />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
