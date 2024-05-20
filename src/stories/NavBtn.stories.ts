import NavBtn from "../components/NavBtn";
import type { Meta, StoryObj } from "@storybook/react";
import { compassOutline } from "ionicons/icons";

const meta = {
  title: 'Discover/NavBtn',
  Component: NavBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    route: { control: 'text' },
    icon: { control: 'text' },
    avatarUrl: { control: 'text' },
    size: { control: 'text' },
  }
} as Meta<typeof NavBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: compassOutline
  }
}

export const WithAvatar: Story = {
  name: "With Avatar",
  args: {
    avatarUrl: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
  }
}