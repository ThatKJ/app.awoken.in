import type { Metadata } from "next"
import { Inter, Manrope, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"
import { ThemeFavicon } from "@/components/layout/theme-favicon"

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Awoken",
    template: "%s | Awoken",
  },
  description: "AI Operating System for Revenue Teams",
  applicationName: "Awoken",
  metadataBase: new URL("https://app.awoken.in"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon-black.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Awoken",
    description: "AI Operating System for Revenue Teams",
    url: "https://app.awoken.in",
    siteName: "Awoken",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awoken",
    description: "AI Operating System for Revenue Teams",
    images: ["/og-image.png"],
  },
  other: {
    "theme-color": "#F97316",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(inter.variable, manrope.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <ThemeFavicon />
          {children}
        </Providers>
      </body>
    </html>
  )
}
