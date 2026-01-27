import { formattedMonth } from "@/shared/lib/formatted-date"
import type { GetKwhMonthFactory } from "../types/getKwhMonthFactory.type"
import { baseUrl } from "@/shared/services/api.service"

export const DashboardService = {
  async getKwhByMonthFactoryYear(
    token: string,
    factoryId: number,
    year?: number,
  ): Promise<GetKwhMonthFactory> {
    let url = `${baseUrl}/api/dashboard/consumption?groupBy=month&factoryId=${factoryId}`

    if (year) {
      url += `&year=${year}`
    }

    const response = await fetch(url, {
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

    const result: GetKwhMonthFactory = await response.json()
    return {
      ...result,
      data: result.data.map((it) => ({
        ...it,
        month: formattedMonth(it.month),
      })),
    }
  },
}
