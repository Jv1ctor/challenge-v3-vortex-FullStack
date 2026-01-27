import { Outlet } from "react-router"
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "@/shared/components/sidebar/AppSidebar"
import { HeaderRoot } from "./shared/components/HeaderRoot"

export const Root = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <HeaderRoot />
          <main className="container mx-auto p-5 min-[1200px]:max-w-full">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
