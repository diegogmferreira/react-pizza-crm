import { api } from "@/lib/axios";
import type { filterOrderStatusEnum } from "@/pages/app/orders/order-table-filters";

export interface GetOrderRequest {
  pageIndex?: number | null;
  orderId?: string | null;
  customerName?: string | null;
  status?: typeof filterOrderStatusEnum.options[number] | null;
}

export interface GetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrders({ pageIndex, orderId, customerName, status }: GetOrderRequest) {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    }
  })

  return response.data
}