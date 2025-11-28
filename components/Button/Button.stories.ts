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
    children: "Upload",
    intent: "default",
    fullWidth: false
  }
}

export const Error: Story = {
  args: {
    children: "Upload",
    intent: "error",
    fullWidth: false
  }
}

export const Warning: Story = {
  args: {
    children: "Upload",
    intent: "warning",
    fullWidth: false
  }
}

export const Secondary: Story = {
  args: {
    children: "Upload",
    intent: "secondary",
    fullWidth: false
  }
}

export const Tertiary: Story = {
  args: {
    children: "Upload",
    intent: "tertiary",
    fullWidth: false
  }
}

export const Disabled: Story = {
  args: {
    children: "Upload",
    intent: "default",
    fullWidth: false,
    isDisabled: true
  }
}
