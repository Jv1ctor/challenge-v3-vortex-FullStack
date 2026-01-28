import { Separator } from "@/shared/components/ui/separator"
import { SidebarTrigger } from "@/shared/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { Link } from "react-router"
import { useRouteHandle } from "../hooks/route-handle.hook"

export const HeaderRoot = () => {
  const handle = useRouteHandle()

  return (
    <header className="flex shrink-0 items-center gap-2 border-b ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {handle.routes &&
              handle.routes.map((it) => (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        to={it.path as string}
                        className="text-lg font-medium"
                      >
                        {it.title}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator />
                </>
              ))}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to={handle.path as string}
                  className="text-lg font-medium"
                >
                  {handle.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <h1 className="text-base font-medium">{title}</h1> */}
      </div>
    </header>
  )
}
