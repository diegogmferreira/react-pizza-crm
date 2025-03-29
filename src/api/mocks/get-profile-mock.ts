import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>('/me', () => {
  return HttpResponse.json({
    id: 'customer-id',
    name: 'John Doe',
    email: 'john@doe.com',
    phone: '+5511999999999',
    role: "manager",
    createdAt: new Date(),
    updatedAt: new Date()
  })
})