import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import { LogOutIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"

type Props = {
  onClick: () => void
}

export const FooterSideBar = ({ onClick }: Props) => {
  return (
    <SidebarFooter>
      <SidebarMenu className="gap-3">
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={onClick}
            className="bg-transparent text-destructive border-2 border-destructive hover:bg-destructive hover:text-muted hover:ease-in-out active:bg-transparent"
          >
            <LogOutIcon />
            Sair
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <div className="flex items-center gap-1.5">
            {/* <SidebarMenuButton> */}
            <Avatar>
              <AvatarFallback className="bg-blue-500 text-white">
                U
              </AvatarFallback>
            </Avatar>
            <span>Username</span>
            {/* </SidebarMenuButton> */}
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
