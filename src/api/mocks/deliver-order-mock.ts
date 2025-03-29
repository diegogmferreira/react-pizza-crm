import { http, HttpResponse } from "msw";
import type { DeliverOrderRequest } from "../deliver-order";

export const deliverOrderMock = http.patch<DeliverOrderRequest, never, never>('/orders/:orderId/deliver', async ({ params }) => {
  if (params.orderId === 'error-order-id') {
    return new HttpResponse(null, { status: 400 })
  }

  return new HttpResponse(null, { status: 204 })
})