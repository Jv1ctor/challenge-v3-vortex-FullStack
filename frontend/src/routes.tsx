import { createBrowserRouter } from "react-router"
import LoginPage from "./pages/LoginPage"
import { authMiddleware } from "./middleware/auth.middleware"
import { DashboardPage } from "./pages/DashboardPage"
import { Root } from "./Root"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    middleware: [authMiddleware],
    element: <Root />,
    children: [{ index: true, element: <DashboardPage/> }],
  },
])
