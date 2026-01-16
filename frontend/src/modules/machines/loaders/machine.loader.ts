import { redirect, type LoaderFunctionArgs } from "react-router"
import { MachineService } from "../services/machines.service"

export const MachineLoader = {
  async getRegistriesByMachine({ params }: LoaderFunctionArgs) {
    const token = localStorage.getItem("token")
    const { id } = params as { id: string }

    if (!token) return redirect("/login")

    try {
      const data = await MachineService.getRegistriesByMachine(
        token,
        Number(id)
      )
      return data || []
    } catch (error) {
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
