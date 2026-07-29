import Link from "next/link"
import { cn } from "@/lib/utils"

interface AppLogoProps {
  className?: string
}

export function AppLogo({ className }: AppLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center shrink-0", className)}>
      <img
        src="/awoken-wordmark-black.svg"
        alt="Awoken"
        className="block h-9 w-auto dark:hidden"
      />
      <img
        src="/awoken-wordmark-white.svg"
        alt="Awoken"
        className="hidden h-9 w-auto dark:block"
      />
    </Link>
  )
}
