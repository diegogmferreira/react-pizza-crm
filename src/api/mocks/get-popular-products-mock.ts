import { http, HttpResponse } from "msw";
import { GetPopularProductsResponse } from "../get-popular-products";

export const getPopularProductsMock = http.get<never, never, GetPopularProductsResponse>('/metrics/popular-products', () => {
  return HttpResponse.json([
    {product: "Pizza", amount: 100},
    {product: "Pasta", amount: 338},
    {product: "Salada", amount: 390},
  ])
})