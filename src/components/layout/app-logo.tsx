import Link from "next/link"
import { cn } from "@/lib/utils"

interface AppLogoProps {
  className?: string
}

export function AppLogo({ className }: AppLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center shrink-0", className)}>
      <img
        src="/logo.svg"
        alt="Awoken"
        className="w-auto h-16 sm:h-20 md:h-20 block dark:hidden"
      />
      <img
        src="/logo-light.svg"
        alt="Awoken"
        className="w-auto h-16 sm:h-20 md:h-20 hidden dark:block"
      />
    </Link>
  )
}
