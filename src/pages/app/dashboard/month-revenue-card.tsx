import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Receita total (mês)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <p className="text-xs text-muted-foreground">
              {
                monthRevenue.diffFromLastMonth >= 0
                  ? (
                    <>
                      <span className="text-chart-2 font-semibold">+{monthRevenue.diffFromLastMonth}%</span> em relação ao mês anterior
                    </>
                  )
                  : (
                    <>
                      <span className="text-destructive font-semibold">{monthRevenue.diffFromLastMonth}%</span> em relação ao mês anterior
                    </>
                  )
              }
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}