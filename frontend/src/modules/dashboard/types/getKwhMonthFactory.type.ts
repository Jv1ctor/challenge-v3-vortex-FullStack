export interface GetKwhMonthFactory {
  id: number
  name: string
  data: MonthlyConsumption[]
}

export interface MonthlyConsumption {
  month: string // ISO date string
  total_kwh: number
}
