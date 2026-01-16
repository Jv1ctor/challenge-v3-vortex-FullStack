import { formatDate } from "@/lib/formatted-date"
import type { Factories } from "../types/factories.type"
import type { MachinesByFactory } from "../types/machines-by-factories.type"

type ResponseApiGetAllFactories = {
  data: Factories[]
}

type ResponseApiGetMachinesByFactories = {
  data: MachinesByFactory[]
}

export const FactoriesService = {
  async getAllFactories(token: string): Promise<Factories[] | null> {
    const response = await fetch("http://localhost:4000/api/factories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })

    if (!response.ok) {
      console.log(`RESPONSE STATUS: ${response.status}`)
      throw response
    }

    const result: ResponseApiGetAllFactories = await response.json()
    return result.data
  },

  async getAllMachinesByFactories(
    token: string,
    factoryId: number
  ): Promise<MachinesByFactory[] | null> {
    const response = await fetch(
      `http://localhost:4000/api/factories/${factoryId}/machines`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    )

    if (!response.ok) {
      console.log(`RESPONSE STATUS: ${response.status}`)
      throw response
    }

    const result: ResponseApiGetMachinesByFactories = await response.json()

    const formatted = result.data.map((it) => ({
      ...it,
      createdAt: formatDate(it.createdAt),
      updatedAt: formatDate(it.updatedAt),
    }))

    return formatted
  },
}
