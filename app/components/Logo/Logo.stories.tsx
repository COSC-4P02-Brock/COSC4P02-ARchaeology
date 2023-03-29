import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Logo } from "./Logo";

export default {
  title: "Components/Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = ({ theme }) => (
  <Logo theme={theme} />
)

export const LightTheme = Template.bind({})
LightTheme.args = {
  theme: 'light',
}

export const DarkTheme = Template.bind({})
DarkTheme.args = {
  theme: 'dark',
}
