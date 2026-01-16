import { createBrowserRouter } from "react-router"
import LoginPage from "./pages/LoginPage"
import { authMiddleware } from "./middleware/auth.middleware"
import { DashboardPage } from "./pages/DashboardPage"
import { Root } from "./Root"
import { FactoryPage } from "./pages/factory/FactoryPage"
import { MachineByFactoryPage } from "./pages/factory/MachineByFactoryPage"
import { FactoriesLoader } from "./modules/factories/loaders/factories.loader"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    middleware: [authMiddleware],
    element: <Root />,
    children: [
      { index: true, handle: { title: "Painel" }, element: <DashboardPage /> },
      {
        path: "factory",
        handle: { title: "Fabricas" },
        loader: FactoriesLoader.getAllFactories,
        element: <FactoryPage />,
      },
      {
        path: "factory/:id/machines",
        handle: { title: "Maquinas" },
        loader: FactoriesLoader.getMachinesByFactories,
        element: <MachineByFactoryPage />,
      },
    ],
  },
])
