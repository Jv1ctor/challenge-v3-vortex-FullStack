import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/shared/components/ui/select"
import { Button } from "@/shared/components/ui/button"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { useState, useEffect, useCallback } from "react"
import { DashboardService } from "./services/dashboard.service"
import { FactoriesService } from "@/modules/factories/services/factories.service"
import type { GetKwhMonthFactory } from "./types/getKwhMonthFactory.type"
import type { Factories } from "@/modules/factories/types/factories.type"
import { RefreshCw } from "lucide-react"

export const DashboardMonthFactory = () => {
  const [chartData, setChartData] = useState<GetKwhMonthFactory | null>(null)
  const [factories, setFactories] = useState<Factories[]>([])
  const [selectedFactory, setSelectedFactory] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const chartConfig = {
    total_kwh: {
      label: "kWh",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    setIsLoading(true)
    try {
      // Buscar fábricas se ainda não tiver
      if (factories.length === 0) {
        const factoriesData = await FactoriesService.getAllFactories(token)
        if (factoriesData && factoriesData.length > 0) {
          setFactories(factoriesData)
          // Define a primeira fábrica como padrão
          if (!selectedFactory) {
            setSelectedFactory(factoriesData[0].id.toString())
          }
        }
      }

      const factoryId = selectedFactory
        ? Number(selectedFactory)
        : factories[0]?.id
      
      if (factoryId) {
        const year = selectedYear && selectedYear !== "all" ? Number(selectedYear) : undefined
        const data = await DashboardService.getKwhByMonthFactoryYear(
          token,
          factoryId,
           year
        )
        setChartData(data)
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedFactory, selectedYear, factories])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleRefresh = () => {
    fetchData()
  }

  const availableYears = [2025, 2024, 2023, 2022, 2021, 2020]

  return (
    <div className="max-w-7xl mx-auto p-5 flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold mb-2">
        Consumo Mensal de Energia (kWh)
        {chartData && ` — ${chartData.name}`}
        {selectedYear && selectedYear !== "all" && ` — ${selectedYear}`}
      </h1>

      <div className="flex gap-4 self-end p-5 items-center">
        <Select value={selectedFactory} onValueChange={setSelectedFactory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione a fábrica" />
          </SelectTrigger>
          <SelectContent>
            {factories.map((factory) => (
              <SelectItem key={factory.id} value={factory.id.toString()}>
                {factory.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Todos os anos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="flex justify-center items-center w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-52">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        ) : chartData && chartData.data.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
            <LineChart
              accessibilityLayer
              data={chartData.data}
              margin={{
                left: 60,
                right: 60,
                top: 12,
                bottom: 60,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="total_kwh"
                type="monotone"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-52">
            <p className="text-muted-foreground">Nenhum dado disponível</p>
          </div>
        )}
      </div>
    </div>
  )
}
