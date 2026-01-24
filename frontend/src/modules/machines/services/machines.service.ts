import { formatDate } from "@/shared/lib/formatted-date"
import type { Registries } from "../types/registries.type"

type ResponseApiGetRegistriesByMachine = {
  data: Registries[]
}

export const MachineService = {
  async getRegistriesByMachine(token: string, machineId: number) {
    const response = await fetch(
      `http://localhost:4000/api/machines/${machineId}/registries`,
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

    const result: ResponseApiGetRegistriesByMachine = await response.json()

    return result.data.map((it) => ({
      ...it,
      createdAt: formatDate(it.createdAt),
    }))
  },
}
