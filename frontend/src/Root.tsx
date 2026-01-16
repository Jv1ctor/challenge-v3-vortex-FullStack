import { Outlet, useMatches } from "react-router"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/AppSidebar"
import { HeaderRoot } from "./components/HeaderRoot"

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
          <main className="container p-5">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
