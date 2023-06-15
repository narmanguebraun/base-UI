import { type Meta, type StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onPress: {
      action: "onPress",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "download",
    intent: "primary",
    fullWidth: false,
  },
};

export const Secondary: Story = {
  args: {
    children: "download",
    intent: "secondary",
    fullWidth: false,
  },
};

export const Danger: Story = {
  args: {
    children: "download",
    intent: "danger",
    fullWidth: false,
  },
};

export const Disabled: Story = {
  args: {
    children: "download",
    intent: "primary",
    fullWidth: false,
    isDisabled: true,
  },
};
