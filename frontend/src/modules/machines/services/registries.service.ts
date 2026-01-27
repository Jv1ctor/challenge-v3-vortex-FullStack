import { baseUrl } from "@/shared/services/api.service"
import type { ResponseErrors } from "@/shared/types/response-errors.type"

export const RegistriesService = {
  async updateRegistry(
    token: string,
    registryId: number,
    value: number,
  ): Promise<boolean> {
    const response = await fetch(`${baseUrl}/api/registries/${registryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ value }),
      credentials: "include",
    })

    if (!response.ok) {
      console.log(`RESPONSE STATUS: ${response.status}`)
      const result: ResponseErrors = await response.json()
      throw result
    }

    return response.status === 204 || response.status === 200
  },
}
