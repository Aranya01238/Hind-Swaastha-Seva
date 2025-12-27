import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/i18n/language-context";
import { Auth0Provider } from "@/components/auth/auth0-provider";
import { Suspense } from "react";
import { PageLoader } from "@/components/page-loader";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HSS",
  description: "HSS — Accessible healthcare guidance and emergency help.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-sans min-h-screen">
        <Auth0Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light" // Ensures the website defaults to light mode
            enableSystem={false} // Prevents the website from automatically switching based on system theme
            disableTransitionOnChange
          >
            <LanguageProvider>
              <Suspense fallback={null}>
                <PageLoader />
                <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
                  {children}
                </div>
              </Suspense>
            </LanguageProvider>
          </ThemeProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
