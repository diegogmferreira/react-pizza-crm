import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Pagination } from "./pagination"

const onPageChangeCallback = vi.fn()

describe("Pagination", () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })

  it("should display the right amount of pages and results", () => {
    const wrapper = render(
      <Pagination
        currentPage={0}
        totalItems={200}
        pageSize={10}
        onPageChange={onPageChangeCallback}
      />
    )

    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
  })

  it("should able to navigate to the next page", async () => {
    const wrapper = render(
      <Pagination
        currentPage={0}
        totalItems={200}
        pageSize={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextButton = wrapper.getByRole('button', { name: "Próxima página" })

    const user = userEvent.setup()
    await user.click(nextButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it("should able to navigate to the previous page", async () => {
    const wrapper = render(
      <Pagination
        currentPage={5}
        totalItems={200}
        pageSize={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextButton = wrapper.getByRole('button', { name: "Página anterior" })

    const user = userEvent.setup()
    await user.click(nextButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(4)
  })

  it("should able to navigate to the first page", async () => {
    const wrapper = render(
      <Pagination
        currentPage={5}
        totalItems={200}
        pageSize={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextButton = wrapper.getByRole('button', { name: "Primeira página" })

    const user = userEvent.setup()
    await user.click(nextButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(0)
  })

  it("should able to navigate to the last page", async () => {
    const wrapper = render(
      <Pagination
        currentPage={5}
        totalItems={200}
        pageSize={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextButton = wrapper.getByRole('button', { name: "Última página" })

    const user = userEvent.setup()
    await user.click(nextButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(19)
  })
})

