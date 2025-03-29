import { queryClient } from "@/lib/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { SignIn } from "./sign-in"

describe('Sign-in', () => {
  it("should set default email input value if email is present on search params", () => {
    const wrapper = render(<SignIn />,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/sign-in?email=test@test.com"]}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          )
        }
      })

      const emailInput = wrapper.getByLabelText("Seu email") as HTMLInputElement

      expect(emailInput.value).toEqual("test@test.com")
  })
})