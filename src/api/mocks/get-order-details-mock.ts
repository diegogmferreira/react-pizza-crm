import { http, HttpResponse } from "msw";
import type { GetOrderDetailsRequest, GetOrderDetailsResponse } from "../get-order-details";

export const getOrderDetailsMock = http.get<GetOrderDetailsRequest, never, GetOrderDetailsResponse>('/orders/:orderId', async ({ params }) => {
  return HttpResponse.json({
    createdAt: new Date().toISOString(),
    orderId: params.orderId,
    status: "pending",
    totalInCents: 1000,
    customer: {
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '+5511999999999',
    },
    orderItems: [
      {
        id: 'item-1',
        priceInCents: 100,
        quantity: 1,
        product: {
          name: 'Pizza',
        }
      },
      {
        id: 'item-2',
        priceInCents: 200,
        quantity: 2,
        product: {
          name: 'Salad',
        }
      }
    ]
  })
})