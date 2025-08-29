import type { Metadata, Viewport } from "next";
import "./styles/globals.css";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";
import WebVitals from "./components/WebVitals";

// Using CSS variables for font families as fallback when Google Fonts are unavailable

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b63f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1d4ed8" }
  ],
}

export const metadata: Metadata = {
  title: "📅 Calendar App - Modern Event Management",
  description: "A modern, responsive calendar application with event management, dark mode, and multi-view support built with Next.js",
  manifest: "/manifest.json",
  keywords: ["calendar", "events", "scheduling", "productivity", "next.js"],
  authors: [{ name: "Calendar App Team" }],
  category: "productivity",
  openGraph: {
    title: "📅 Calendar App - Modern Event Management",
    description: "A modern, responsive calendar application with event management",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "📅 Calendar App",
    description: "Modern event management made simple",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased min-h-screen font-sans">
        <ServiceWorkerRegister />
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
