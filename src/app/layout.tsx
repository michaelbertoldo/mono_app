import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mono Helper",
  description: "Simple, kind guidance and reminders while you recover from mono.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "48x48" }],
    apple: [{ url: "/favicon.ico" }],
  },
  appleWebApp: {
    capable: true,
    title: "Mono Helper",
    statusBarStyle: "default",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <div className="mx-auto max-w-[480px] min-h-dvh flex flex-col">
          <main className="flex-1 pb-[72px] px-4 pt-4 sm:px-6">
            {children}
          </main>
          <BottomNav />
        </div>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
