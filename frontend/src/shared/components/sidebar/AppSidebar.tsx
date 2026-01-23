import { FactoryIcon, LayoutDashboard, type LucideProps } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import { NavLink, useNavigate } from "react-router"
import { useAuth } from "@/modules/auth/hooks/auth.hook"
import { FooterSideBar } from "./FooterSidebar"
import { HeaderSidebar } from "./HeaderSidebar"
import {
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react"

type Items = {
  title: string
  url: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
  active: boolean
}

const items: Items[] = [
  {
    title: "Painel",
    url: "/",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Fabricas",
    url: "/factory",
    icon: FactoryIcon,
    active: false,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [list, setList] = useState<Items[]>(items)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleClick = (index: number) => {
    if(list[index].active) return
    const newList: Items[] = list.map((it) => ({ ...it, active: false }))
    newList[index] = {
      ...list[index],
      active: !list[index].active,
    }
    setList([...newList])
  }

  return (
    <Sidebar {...props}>
      <HeaderSidebar />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {list.map((item, idx) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      onClick={() => handleClick(idx)}
                      className={`${item.active ? "bg-sidebar-primary text-white hover:bg-sidebar-primary hover:text-white" : "bg-transparent"}`}
                    >
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
