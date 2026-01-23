import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

export const DashboardPage = () => {
  const chartData = [
    {
      month: "2025-01-01T00:00:00.000Z",
      total_kwh: 1527.0900000000001,
    },
    {
      month: "2025-02-01T00:00:00.000Z",
      total_kwh: 1503.22,
    },
    {
      month: "2025-03-01T00:00:00.000Z",
      total_kwh: 1225.0099999999998,
    },
    {
      month: "2025-04-01T00:00:00.000Z",
      total_kwh: 1043.31,
    },
    {
      month: "2025-05-01T00:00:00.000Z",
      total_kwh: 1693.63,
    },
    {
      month: "2025-06-01T00:00:00.000Z",
      total_kwh: 1508.46,
    },
    {
      month: "2025-07-01T00:00:00.000Z",
      total_kwh: 998.96,
    },
    {
      month: "2025-08-01T00:00:00.000Z",
      total_kwh: 761.91,
    },
    {
      month: "2025-09-01T00:00:00.000Z",
      total_kwh: 833.95,
    },
    {
      month: "2025-10-01T00:00:00.000Z",
      total_kwh: 421.84999999999997,
    },
    {
      month: "2025-11-01T00:00:00.000Z",
      total_kwh: 666.92,
    },
    {
      month: "2025-12-01T00:00:00.000Z",
      total_kwh: 1045.41,
    },
  ]

  const formattedData = (data: { month: string; total_kwh: number }[]) => {
    return data.map((it) => {
      const date = new Date(it.month)
      console.log(date)
      const month = new Intl.DateTimeFormat("pt-br", {
        month: "short",
        year: "2-digit"
      }).format(date)
      return {
        month,
        value: it.total_kwh,
      }
    })
  }

  const chartConfig = {
    value: {
      label: "kWh",
      color: "--chart-1"
    },
  } satisfies ChartConfig

  return (
    <div className="flex justify-center items-center w-full">
      <ChartContainer config={chartConfig} className="min-h-52 w-full">
        <LineChart
          accessibilityLayer
          data={formattedData(chartData)}
          margin={{
            left: 30,
            right: 30,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={3}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="value"
            type="natural"
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
