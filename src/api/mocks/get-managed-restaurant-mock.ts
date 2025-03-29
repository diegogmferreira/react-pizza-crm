import { http, HttpResponse } from "msw";
import { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<never, never, GetManagedRestaurantResponse>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'restaurant-id',
    name: 'Pizza Hut',
    createdAt: new Date(),
    updatedAt: new Date(),
    description: 'Pizza Hut is a chain restaurant that specializes in pizza and Italian cuisine.',
    managerId: 'customer-id'
  })
})