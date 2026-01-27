import { formatDate } from "@/shared/lib/formatted-date"
import type { RegistriesByMachine } from "../types/registries.type"
import { baseUrl } from "@/shared/services/api.service"

export const MachineService = {
  async getRegistriesByMachine(
    token: string,
    machineId: number,
  ): Promise<RegistriesByMachine> {
    const response = await fetch(
      `${baseUrl}/api/machines/${machineId}/registries`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      },
    )

    if (!response.ok) {
      console.log(`RESPONSE STATUS: ${response.status}`)
      throw response
    }

    const result: RegistriesByMachine = await response.json()
    const data = result.data.map((it) => ({
      ...it,
      createdAt: formatDate(it.createdAt),
    }))

    return {
      ...result,
      data: data,
    }
  },
}
