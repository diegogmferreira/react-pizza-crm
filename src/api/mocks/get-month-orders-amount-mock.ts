import { http, HttpResponse } from "msw";
import type { GetMonthOrdersAmountResponse } from "../get-month-orders-amount";

export const getMonthOrdersAmountMock = http.get<never, never, GetMonthOrdersAmountResponse>('/metrics/month-orders-amount', async () => {
  return HttpResponse.json({
    amount: 180,
    diffFromLastMonth: 54
  })
})