import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "jest-axe"
import { describe, expect, it, vi } from "vitest"

import { TextField } from "./TextField"

describe("TextField", () => {
  it("renders with a visible label", () => {
    render(<TextField label="Email" />)
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  it("associates label with input", () => {
    render(<TextField label="Email" />)
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument()
  })

  it("shows description when provided", () => {
    render(
      <TextField label="Email" description="We'll never share your email." />
    )
    expect(
      screen.getByText("We'll never share your email.")
    ).toBeInTheDocument()
  })

  it("hides description and shows error when invalid", () => {
    render(
      <TextField
        label="Email"
        description="Helper text"
        isInvalid
        errorMessage="Invalid email address."
      />
    )
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument()
    expect(screen.getByText("Invalid email address.")).toBeInTheDocument()
  })

  it("calls onChange as the user types", async () => {
    const onChange = vi.fn()
    render(<TextField label="Email" onChange={onChange} />)
    await userEvent.type(screen.getByRole("textbox"), "hello")
    expect(onChange).toHaveBeenCalled()
  })

  it("is disabled when isDisabled is true", () => {
    render(<TextField label="Email" isDisabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
  })

  it("shows required indicator when isRequired", () => {
    render(<TextField label="Email" isRequired />)
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it.each(["default", "warning"] as const)(
    "%s intent has no accessibility violations",
    async intent => {
      const { container } = render(<TextField label="Email" intent={intent} />)
      expect(await axe(container)).toHaveNoViolations()
    }
  )

  it("invalid state has no accessibility violations", async () => {
    const { container } = render(
      <TextField
        label="Email"
        isInvalid
        errorMessage="Invalid email address."
      />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it("disabled state has no accessibility violations", async () => {
    const { container } = render(<TextField label="Email" isDisabled />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
