import { type Meta, type StoryObj } from "@storybook/nextjs"

import { Checkbox } from "./Checkbox"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "onChange" }
  }
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  }
}

export const Checked: Story = {
  args: {
    label: "Accept terms and conditions",
    defaultSelected: true,
  }
}

export const Indeterminate: Story = {
  args: {
    label: "Select all",
    isIndeterminate: true,
  }
}

export const WithDescription: Story = {
  args: {
    label: "Marketing emails",
    description: "Receive emails about new products, features, and more.",
  }
}

export const Invalid: Story = {
  args: {
    label: "Accept terms and conditions",
    isInvalid: true,
    errorMessage: "You must accept the terms to continue.",
  }
}

export const Required: Story = {
  args: {
    label: "Accept terms and conditions",
    isRequired: true,
  }
}

export const Disabled: Story = {
  args: {
    label: "Accept terms and conditions",
    isDisabled: true,
  }
}

export const DisabledChecked: Story = {
  args: {
    label: "Accept terms and conditions",
    defaultSelected: true,
    isDisabled: true,
  }
}
