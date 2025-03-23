import { getMonthCanceledOrdersAmount } from "@/api/get-moth-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { CircleOff } from "lucide-react";

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Pedidos cancelados (mês)</CardTitle>
        <CircleOff className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {
          monthCanceledOrdersAmount && (
            <>
              <span className="text-2xl font-bold tracking-tight"> 55</span>
              <p className="text-xs text-muted-foreground">
                {
                  monthCanceledOrdersAmount.diffFromLastMonth < 0
                    ? (
                      <>
                        <span className="text-chart-2 font-semibold">{monthCanceledOrdersAmount.diffFromLastMonth}%</span> em relação ao mês anterior
                      </>
                    )
                    : (
                      <>
                        <span className="text-destructive font-semibold">-{monthCanceledOrdersAmount.diffFromLastMonth}%</span> em relação ao mês anterior
                      </>
                    )
                }
              </p>
            </>
          )
        }
      </CardContent>
    </Card>
  )
}