"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/app-shell/sidebar"
import { Topbar } from "@/components/app-shell/topbar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Sidebar as MobileSidebar } from "@/components/app-shell/sidebar"

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const openMobile = useCallback(() => setMobileOpen(true), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => {}}
        mobileOpen={mobileOpen}
        onMobileClose={closeMobile}
      />

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[240px] p-0">
          <MobileSidebar
            collapsed={false}
            onToggleCollapse={() => {}}
            mobileOpen={mobileOpen}
            onMobileClose={closeMobile}
          />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col md:ml-[240px]">
        <Topbar onMobileMenuToggle={openMobile} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
