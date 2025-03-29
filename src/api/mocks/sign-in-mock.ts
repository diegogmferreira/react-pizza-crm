import { http, HttpResponse } from "msw"
import type { SignInRequest } from "../sign-in"

export const signInMock = http.post<never, SignInRequest>('/authenticate', async ({ request }) => {
  const { email } = await request.json()

  if (email === 'john@doe.com') {
    return new HttpResponse(null, { 
      status: 200, 
      headers: {
        'Set-Cookie': "auth=sample-jwt"
      }
    })
  }

  return new HttpResponse(null, { status: 401 })
})