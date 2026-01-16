import { redirect, type LoaderFunctionArgs } from "react-router"
import { FactoriesService } from "../services/factories.service"

export const FactoriesLoader = {
  async getAllFactories() {
    const token = localStorage.getItem("token")

    if (!token) {
      return redirect("/login")
    }

    try {
      const data = await FactoriesService.getAllFactories(token)
      return data || []
    } catch (error) {
      // Se 401/403 (token expirado), limpa e redireciona
      if (
        error instanceof Response &&
        (error.status === 401 || error.status === 403)
      ) {
        localStorage.removeItem("token")
        return redirect("/login")
      }
    }
  },

  async getMachinesByFactories({ params }: LoaderFunctionArgs) {
    const token = localStorage.getItem("token")
    const { id } = params as { id: string }

    if (!token) {
      return redirect("/login")
    }

    try {
      const data = await FactoriesService.getAllMachinesByFactories(token, Number(id))
      return data || []
    } catch (error) {
      // Se 401/403 (token expirado), limpa e redireciona
      if (
        error instanceof Response &&
        (error.status === 401 || error.status === 403)
      ) {
        localStorage.removeItem("token")
        return redirect("/login")
      }
    }
  },
}
