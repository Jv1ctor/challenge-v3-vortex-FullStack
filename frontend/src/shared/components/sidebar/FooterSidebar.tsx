import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import { LogOutIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { useAuth } from "@/modules/auth/hooks/auth.hook"

type Props = {
  onClick: () => void
}

export const FooterSideBar = ({ onClick }: Props) => {
  const { username } = useAuth()

  const getIconUsername = (username?: string | null) => {
    return username ? username[0].toUpperCase() : "U"
  }

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
                {getIconUsername(username)}
              </AvatarFallback>
            </Avatar>
            <span>{username ? username?.toUpperCase () : "Username"}</span>
            {/* </SidebarMenuButton> */}
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
