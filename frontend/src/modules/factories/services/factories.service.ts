import { formatDate } from "@/lib/formatted-date"
import type { Factories } from "../types/factories.type"
import type { MachinesByFactory } from "../types/machines-by-factories.type"
import type { UsersByFactories } from "../types/users-by-factories.type"
import type { FactoryFormData } from "../schemas/factory.schema"

type ResponseApiGetAllFactories = {
  data: Factories[]
}

type ResponseApiGetMachinesByFactories = {
  data: MachinesByFactory[]
}

type ResponseApiGetUsersByFactories = {
  data: UsersByFactories[]
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
    factoryId: number,
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
      },
    )

    if (!response.ok) {
      console.log(`RESPONSE STATUS: ${response.status}`)
      throw response
    }

    const result: ResponseApiGetMachinesByFactories = await response.json()

    const formatted = result.data.map((it) => ({
      ...it,
      created_at: formatDate(it.created_at),
      updated_at: formatDate(it.updated_at),
      last_registry_at: formatDate(it.last_registry_at),
      total_registries: it.total_registries,
      total_value: it.total_value,
    }))

    return formatted
  },

  async getAllUsersByFactories(
    token: string,
    factoryId: number,
  ): Promise<UsersByFactories[]> {
    const response = await fetch(
      `http://localhost:4000/api/factories/${factoryId}/user`,
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

    const result: ResponseApiGetUsersByFactories = await response.json()

    const formatted = result.data.map((it) => ({
      ...it,
      last_registry_at: formatDate(it.last_registry_at),
    }))

    return formatted
  },

  async createFactory(token: string, body: FactoryFormData) {
    const response = await fetch(
      `http://localhost:4000/api/factories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        credentials: "include",
      },
    )

    if (!response.ok) {
      console.log(`RESPONSE STATUS: ${response.status}`)
      throw response
    }

    const result: { id: number } = await response.json()

    return result
  },
}
