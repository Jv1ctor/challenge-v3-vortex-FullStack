import { Cog, FactoryIcon, LayoutDashboard, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink, useNavigate } from "react-router"
import { useAuth } from "@/modules/auth/hooks/auth.hook"
import { FooterSideBar } from "./FooterSidebar"
import { HeaderSidebar } from "./HeaderSidebar"

const items = [
  {
    title: "Painel",
    url: "/",
    icon: LayoutDashboard,
    aticve: true,
  },
  {
    title: "Fabricas",
    url: "/factory",
    icon: FactoryIcon,
    aticve: false,
  },
  {
    title: "Maquinas",
    url: "#",
    icon: Cog,
    aticve: false,
  },
  {
    title: "Usuarios",
    url: "#",
    icon: Users,
    aticve: false,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <Sidebar {...props}>
      <HeaderSidebar />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={({ }) => "bg-red-50"}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <FooterSideBar onClick={handleLogout} />
    </Sidebar>
  )
}
