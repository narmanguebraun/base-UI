import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "jest-axe"
import { describe, expect, it, vi } from "vitest"

import { Button } from "./Button"

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button intent="default">Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("calls onPress when clicked", async () => {
    const onPress = vi.fn()
    render(
      <Button intent="default" onPress={onPress}>
        Click me
      </Button>
    )
    await userEvent.click(screen.getByRole("button"))
    expect(onPress).toHaveBeenCalledOnce()
  })

  it("is disabled when isDisabled is true", () => {
    render(
      <Button intent="default" isDisabled>
        Click me
      </Button>
    )
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("does not call onPress when disabled", async () => {
    const onPress = vi.fn()
    render(
      <Button intent="default" isDisabled onPress={onPress}>
        Click me
      </Button>
    )
    await userEvent.click(screen.getByRole("button"))
    expect(onPress).not.toHaveBeenCalled()
  })

  it.each(["default", "primary", "destructive", "warning", "ghost"] as const)(
    "%s intent has no accessibility violations",
    async intent => {
      const { container } = render(<Button intent={intent}>Click me</Button>)
      expect(await axe(container)).toHaveNoViolations()
    }
  )

  it("disabled state has no accessibility violations", async () => {
    const { container } = render(
      <Button intent="default" isDisabled>
        Click me
      </Button>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
