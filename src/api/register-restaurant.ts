import { api } from "@/lib/axios";

export interface RegisterRestaurantRequest {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant({
  email,
  managerName,
  restaurantName,
  phone
}: RegisterRestaurantRequest) {
  await api.post("/restaurants", { 
    email,
    managerName,
    restaurantName,
    phone
  })
}