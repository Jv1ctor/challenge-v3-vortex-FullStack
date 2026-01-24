import { NavLink } from "react-router"
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"
import { Zap } from "lucide-react"

export const HeaderSidebar = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="hover:bg-transparent active:bg-transparent"  asChild>
            <NavLink to="/">
              <div className="bg-primary text-primary-foreground p-1 rounded-md">
                <Zap />
              </div>
              <span className="text-base font-semibold">Energy Manager</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
