"use client"

import { useEffect } from "react"

export function ThemeFavicon() {
  useEffect(() => {
    const update = () => {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches

      let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null

      if (!favicon) {
        favicon = document.createElement("link")
        favicon.rel = "icon"
        document.head.appendChild(favicon)
      }

      favicon.href = dark ? "/favicon-white.svg" : "/favicon.svg"
    }

    update()

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    media.addEventListener("change", update)

    return () => media.removeEventListener("change", update)
  }, [])

  return null
}
