import { http, HttpResponse } from "msw";
import type { GetOrdersResponse } from "../get-orders";

type OrderStatus = GetOrdersResponse['orders'][number]['status']
type Orders = GetOrdersResponse['orders']

const statuses: OrderStatus[] = [
  "pending",
  "canceled",
  "processing",
  "delivering",
  "delivered",
]

const orders: Orders = Array.from({ length: 60 }).map((_, index) => {
  return {
    createdAt: new Date().toISOString(),
    orderId: `order-${index + 1}`,
    customerName: `Customer ${index + 1}`,
    total: index * Math.random() * 1000,
    status: statuses[index % 5],
  }
})

export const getOrdersMock = http.get<never, never, GetOrdersResponse>("/orders", async ({ request, params }) => {
  console.log(params)

  const { searchParams } = new URL(request.url)
  const pageIndex = searchParams.get('pageIndex')
    ? Number(searchParams.get('pageIndex'))
    : 0

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  let filteredOrders = orders

  if (customerName) {
    filteredOrders = filteredOrders.filter(order => order.customerName.includes(customerName))
  }

  if (orderId) {
    filteredOrders = filteredOrders.filter(order => order.orderId.includes(orderId))
  }

  if (status) {
    filteredOrders = filteredOrders.filter(order => order.status === status)
  }

  const paginatedOrders = filteredOrders.slice(
    pageIndex * 10, 
    (pageIndex + 1) * 10,
  )

  return HttpResponse.json({
    orders: paginatedOrders,
    meta: {
      pageIndex: pageIndex,
      perPage: 10,
      totalCount: filteredOrders.length,
    }
  })
})