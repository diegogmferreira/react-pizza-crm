import { render } from "@testing-library/react"
import { OrderStatus } from "./order-status"

describe("OrderStatus", () => {
  it("should display the right text based on the status is pending", () => {
    let wrapper = render(<OrderStatus status="pending" />)

    let statusText = wrapper.getByText("Pendente")
    let badgeElement = wrapper.getByTestId("badge")

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass("bg-slate-400")
  }),

  it("should display the right text based on the status is canceled", () => {
    let wrapper = render(<OrderStatus status="canceled" />)

    let statusText = wrapper.getByText("Cancelado")
    let badgeElement = wrapper.getByTestId("badge")

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass("bg-rose-500")
  }),

  it("should display the right text based on the status is delivered", () => {
    let wrapper = render(<OrderStatus status="delivered" />)

    let statusText = wrapper.getByText("Entregue")
    let badgeElement = wrapper.getByTestId("badge")

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass("bg-emerald-500")
  }),

  it("should display the right text based on the status is processing", () => {
    let wrapper = render(<OrderStatus status="processing" />)

    let statusText = wrapper.getByText("Em processamento")
    let badgeElement = wrapper.getByTestId("badge")

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass("bg-amber-400")
  }),

  it("should display the right text based on the status is delivering", () => {
    let wrapper = render(<OrderStatus status="delivering" />)

    let statusText = wrapper.getByText("Entregando")
    let badgeElement = wrapper.getByTestId("badge")

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass("bg-amber-400")
  })
})