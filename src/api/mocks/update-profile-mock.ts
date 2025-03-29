import { http, HttpResponse } from "msw";
import type { UpdateProfileRequest } from "../update-profile";

export const updateProfileMock = http.put<never, UpdateProfileRequest>('/profile', async ({ request }) => {
  const {name} = await request.json()

  if (name === 'Pizza Hut 2') {
    return new HttpResponse(null, { 
      status: 204, 
    })
  }

  return new HttpResponse(null, { status: 400 })
})