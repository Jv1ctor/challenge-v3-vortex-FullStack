import { createBrowserRouter, Navigate } from "react-router"
import LoginPage from "./pages/LoginPage"
import { authMiddleware } from "./shared/middleware/auth.middleware"
import { DashboardPage } from "./pages/DashboardPage"
import { Root } from "./Root"
import { FactoryPage } from "./pages/factory/FactoryPage"
import { MachineByFactoryPage } from "./pages/factory/MachineByFactoryPage"
import { FactoriesLoader } from "./modules/factories/loaders/factories.loader"
import { RegistriesByMachinePage } from "./pages/machine/RegistriesByMachinePage"
import { MachineLoader } from "./modules/machines/loaders/machine.loader"
import { UserByFactoryPage } from "./pages/factory/UserByFactoryPage"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  { path: "*", element: <Navigate to={"/"} replace /> },
  {
    path: "/",
    middleware: [authMiddleware],
    element: <Root />,
    children: [
      { index: true, handle: { title: "Painel" }, element: <DashboardPage /> },
      {
        path: "factory",
        handle: { title: "Fabricas", path: "/factory" },
        loader: FactoriesLoader.getAllFactories,
        element: <FactoryPage />,
      },
      {
        path: "factory/:id/machines",
        handle: {
          title: "Maquinas",
          path: (p: { id: string }) => `factory/${p.id}/machines`,
          routes: [{ title: "Fabricas", path: "/factory" }],
        },
        loader: FactoriesLoader.getMachinesByFactories,
        element: <MachineByFactoryPage />,
      },
      {
        path: "factory/:id/users",
        handle: {
          title: "Operadores",
          path: (p: { id: string }) => `factory/${p.id}/users`,
          routes: [{ title: "Fabricas", path: "/factory" }],
        },
        loader: FactoriesLoader.getUsersByFactories,
        element: <UserByFactoryPage />,
      },
      {
        path: "factory/:factoryId/machines/:id/registries",
        handle: {
          title: "Registros",
          path: (p: { factoryId: string; id: string }) =>
            `factory/${p.factoryId}/machines/${p.id}/registries`,
          routes: [
            { title: "Fabricas", path: "/factory" },
            {
              title: "Maquinas",
              path: (p: { factoryId: string }) =>
                `/factory/${p.factoryId}/machines`,
            },
          ],
        },
        loader: MachineLoader.getRegistriesByMachine,
        element: <RegistriesByMachinePage />,
      },
    ],
  },
])
