"use client"

import { useEffect } from "react"

export function ThemeFavicon() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")

    function update() {
      const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/svg+xml"]')
      if (!favicon) return
      favicon.href = mq.matches ? "/icon-white.svg" : "/icon-black.svg"
    }

    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return null
}
