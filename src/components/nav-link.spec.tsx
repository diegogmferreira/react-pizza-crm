import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { NavLink } from "./nav-link"

describe('NavLink', () => {
  it("should highlight the nav link when is the current page link", () => {
    const wrapper = render(
      <>
        <NavLink to="/home" >Home</NavLink>
        <NavLink to="/about" >About</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/about"]}>
              {children}
            </MemoryRouter>
          )
        }
      })

    expect(wrapper.getByText("Home").dataset.active).toEqual("false")
    expect(wrapper.getByText("About").dataset.active).toEqual("true")
  })
})