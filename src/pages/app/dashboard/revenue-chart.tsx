import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picket";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { subDays } from 'date-fns';
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import colors from "tailwindcss/colors";

export function RevenueChart() {
  const [datePeriod, setDatePeriod] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', datePeriod],
    queryFn: () => getDailyRevenueInPeriod({
      from: datePeriod?.from,
      to: datePeriod?.to,
    })
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map(charItem => {
      return {
        date: charItem.date,
        receipt: charItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker 
            date={datePeriod}
            onChangeDate={setDatePeriod}
          />

        </div>
      </CardHeader>

      <CardContent>
        {
          chartData && (
            <ResponsiveContainer width={"100%"} height={240}>
              <LineChart
                data={chartData}
                style={{ fontSize: 12 }}
                width={500}
                height={300}
              >
                <XAxis
                  dataKey={'date'}
                  tickLine={false}
                  axisLine={false}
                  dy={16}
                />

                <YAxis
                  stroke="#888"
                  axisLine={false}
                  tickLine={false}
                  width={100}
                  dx={-16}
                  tickFormatter={(value: number) => (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                />

                <CartesianGrid vertical={false} className="stroke-muted" />
                {/* <Tooltip /> */}

                <Line type="linear" strokeWidth="2" dataKey="receipt" stroke={colors['orange'][500]} />
              </LineChart>
            </ResponsiveContainer>
          )
        }
      </CardContent>
    </Card>
  )
}