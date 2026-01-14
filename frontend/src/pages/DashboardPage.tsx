import { Button } from "@/components/ui/button"
import { useAuth } from "@/modules/auth/hooks/auth.hook"
import { useNavigate } from "react-router"

export const DashboardPage = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return <Button onClick={handleLogout}>teste</Button>
}
