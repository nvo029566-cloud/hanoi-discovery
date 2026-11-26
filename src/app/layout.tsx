import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import { AuthMenu } from "@/components/auth/auth-menu";
import { HtmlLang } from "@/components/layout/html-lang";
import { Navbar } from "@/components/layout/navbar";
import { SkipLink } from "@/components/layout/skip-link";
import { Footer } from "@/components/layout/footer";
import { OfflineIndicator } from "@/components/pwa/offline-indicator";
import { AITourAssistant } from "@/components/ai/ai-tour-assistant";
import { MobileNavDock } from "@/components/layout/mobile-nav-dock";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0c2825",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <HtmlLang />
        <SkipLink />
        <Navbar
          authSlot={
            <Suspense fallback={<span aria-hidden="true" className="inline-block size-11" />}>
              <AuthMenu />
            </Suspense>
          }
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <MobileNavDock />
        <OfflineIndicator />
        <AITourAssistant />
        <Footer />
      </body>
    </html>
  );
}
