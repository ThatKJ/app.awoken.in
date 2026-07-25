import { ProductNavigation } from "@/components/layout/product-navigation"
import { Container } from "@/components/ui/container"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <ProductNavigation />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-surface">
        <Container className="py-8 md:py-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Awoken. Business Intelligence &amp; AI Implementation Consultancy.
            </p>
          </div>
        </Container>
      </footer>
    </>
  )
}
