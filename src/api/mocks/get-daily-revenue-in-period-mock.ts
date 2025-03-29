import { http, HttpResponse } from "msw";
import type { GetDailyRevenueInPeriodRequest, GetDailyRevenueInPeriodResponse } from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<never, GetDailyRevenueInPeriodRequest, GetDailyRevenueInPeriodResponse>('/metrics/daily-receipt-in-period', async () => {
  return HttpResponse.json([
    {date: "2025-01-01", receipt: 100},
    {date: "2025-01-02", receipt: 200},
    {date: "2025-01-03", receipt: 300},
    {date: "2025-01-04", receipt: 400},
    {date: "2025-01-05", receipt: 500},
    {date: "2025-01-06", receipt: 350},
    {date: "2025-01-07", receipt: 550},
    {date: "2025-01-08", receipt: 250},
    {date: "2025-01-09", receipt: 900},
    {date: "2025-01-10", receipt: 1000},
  ])
})