import { useMatches, type Params } from "react-router"

type HandleType = {
  title: string
  path: string | ((p: Params) => string)
  routes?: { title: string; path: string | ((p: Params) => string) }[]
}

export const useRouteHandle = (): HandleType => {
  const matches = useMatches()

  const currentRoute = matches[matches.length - 1]
  const handle = currentRoute?.handle as HandleType

  console.log(matches)

  return {
    ...handle,
    path:
      typeof handle.path === "function"
        ? handle.path(currentRoute.params)
        : handle.path,
    routes: handle.routes?.map((it) => ({
      ...it,
      path:
        typeof it.path === "function" ? it.path(currentRoute.params) : it.path,
    })),
  }
}
