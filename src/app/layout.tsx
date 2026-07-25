import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AppShell } from "@/components/layout/app-shell"
import { ThemeScript } from "./theme-script"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Awoken | Revenue Recovery System",
    template: "%s | Awoken",
  },
  description:
    "Explore how Awoken helps businesses recover opportunities that would otherwise disappear.",
  metadataBase: new URL("https://app.awoken.in"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    title: "Awoken | Revenue Recovery System",
    description:
      "Explore how Awoken helps businesses recover opportunities that would otherwise disappear.",
    url: "https://app.awoken.in",
    siteName: "Awoken",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awoken | Revenue Recovery System",
    description:
      "Explore how Awoken helps businesses recover opportunities that would otherwise disappear.",
    images: ["/og-image.png"],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
