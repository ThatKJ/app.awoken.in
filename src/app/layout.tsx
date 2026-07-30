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
    icon: "/favicon-black.png",
    apple: "/apple-touch-icon.png",
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
