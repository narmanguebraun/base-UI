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

export const Primary: Story = {
  args: {
    children: "Primary",
    intent: "primary",
    fullWidth: false
  }
}

export const Destructive: Story = {
  args: {
    children: "Destructive",
    intent: "destructive",
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

export const Ghost: Story = {
  args: {
    children: "Ghost",
    intent: "ghost",
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
