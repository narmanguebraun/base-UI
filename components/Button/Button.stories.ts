import { type Meta, type StoryObj } from "@storybook/nextjs"

import { Button } from "./Button"

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onPress: {
      action: "onPress"
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Default",
    intent: "default",
    fullWidth: false
  }
}

export const Error: Story = {
  args: {
    children: "Error",
    intent: "error",
    fullWidth: false
  }
}

export const Warning: Story = {
  args: {
    children: "Warning",
    intent: "warning",
    fullWidth: false
  }
}

export const Secondary: Story = {
  args: {
    children: "Secondary",
    intent: "secondary",
    fullWidth: false
  }
}

export const Tertiary: Story = {
  args: {
    children: "Tertiary",
    intent: "tertiary",
    fullWidth: false
  }
}

export const Disabled: Story = {
  args: {
    children: "Disabled",
    intent: "default",
    fullWidth: false,
    isDisabled: true
  }
}
