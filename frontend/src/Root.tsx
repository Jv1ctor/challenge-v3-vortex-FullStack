import { Outlet, useMatches } from "react-router"
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "@/shared/components/sidebar/AppSidebar"
import { HeaderRoot } from "./shared/components/HeaderRoot"

type HandleType = {
  title: string
}

export const Root = () => {
  const matches = useMatches()

  const currentRoute = matches[matches.length - 1]
  const { title } = currentRoute?.handle as HandleType

  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <HeaderRoot title={title} />
          <main className="container mx-auto p-5">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
