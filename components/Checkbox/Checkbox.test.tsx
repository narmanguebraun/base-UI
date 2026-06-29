import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "jest-axe"
import { describe, expect, it, vi } from "vitest"

import { Checkbox } from "./Checkbox"

describe("Checkbox", () => {
  it("renders with a visible label", () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByText("Accept terms")).toBeInTheDocument()
  })

  it("renders a checkbox input", () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  it("is unchecked by default", () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByRole("checkbox")).not.toBeChecked()
  })

  it("is checked when defaultSelected is true", () => {
    render(<Checkbox label="Accept terms" defaultSelected />)
    expect(screen.getByRole("checkbox")).toBeChecked()
  })

  it("can be toggled by clicking the label", async () => {
    render(<Checkbox label="Accept terms" />)
    await userEvent.click(screen.getByText("Accept terms"))
    expect(screen.getByRole("checkbox")).toBeChecked()
  })

  it("calls onChange when toggled", async () => {
    const onChange = vi.fn()
    render(<Checkbox label="Accept terms" onChange={onChange} />)
    await userEvent.click(screen.getByRole("checkbox"))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it("sets aria-checked to mixed when indeterminate", () => {
    render(<Checkbox label="Select all" isIndeterminate />)
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "mixed"
    )
  })

  it("is disabled when isDisabled is true", () => {
    render(<Checkbox label="Accept terms" isDisabled />)
    expect(screen.getByRole("checkbox")).toBeDisabled()
  })

  it("does not toggle when disabled", async () => {
    const onChange = vi.fn()
    render(<Checkbox label="Accept terms" isDisabled onChange={onChange} />)
    await userEvent.click(screen.getByText("Accept terms"))
    expect(onChange).not.toHaveBeenCalled()
  })

  it("shows description when provided", () => {
    render(
      <Checkbox
        label="Marketing emails"
        description="Receive product updates."
      />
    )
    expect(screen.getByText("Receive product updates.")).toBeInTheDocument()
  })

  it("hides description and shows error when invalid", () => {
    render(
      <Checkbox
        label="Accept terms"
        description="Please read carefully."
        isInvalid
        errorMessage="You must accept to continue."
      />
    )
    expect(screen.queryByText("Please read carefully.")).not.toBeInTheDocument()
    expect(screen.getByText("You must accept to continue.")).toBeInTheDocument()
  })

  it("default state has no accessibility violations", async () => {
    const { container } = render(<Checkbox label="Accept terms" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it("checked state has no accessibility violations", async () => {
    const { container } = render(
      <Checkbox label="Accept terms" defaultSelected />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it("indeterminate state has no accessibility violations", async () => {
    const { container } = render(
      <Checkbox label="Select all" isIndeterminate />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it("disabled state has no accessibility violations", async () => {
    const { container } = render(<Checkbox label="Accept terms" isDisabled />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it("invalid state has no accessibility violations", async () => {
    const { container } = render(
      <Checkbox
        label="Accept terms"
        isInvalid
        errorMessage="You must accept to continue."
      />
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
