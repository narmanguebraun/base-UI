import { type Meta, type StoryObj } from "@storybook/nextjs"

import { TextField } from "./TextField"

const meta = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "onChange" }
  }
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
  }
}

export const WithDescription: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    description: "We'll never share your email.",
  }
}

export const Warning: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    intent: "warning",
    description: "This email is already associated with an account.",
  }
}

export const Invalid: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    isInvalid: true,
    errorMessage: "Please enter a valid email address.",
  }
}

export const Required: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    isRequired: true,
  }
}

export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    isDisabled: true,
  }
}
