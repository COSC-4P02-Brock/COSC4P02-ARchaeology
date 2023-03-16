import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: "Click me",
  primary: true,
};

export const PrimaryButtonInverse = Template.bind({});
PrimaryButtonInverse.args = {
  children: "Click me",
  inverse: true,
  primary: true,
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  children: "Click me",
};

export const SecondaryButtonInverse = Template.bind({});
SecondaryButtonInverse.args = {
  children: "Click me",
  inverse: true,
};

export const LargeButton = Template.bind({});
LargeButton.args = {
  children: "Click me",
  size: "large",
};

export const SmallButton = Template.bind({});
SmallButton.args = {
  children: "Click me",
  size: "small",
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  children: "Click me",
  disabled: true,
}

export const Link = Template.bind({});
Link.args = {
  children: "Visit Google",
  href: "https://google.com",
}

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  children: "Visit Google in a new tab",
  href: "https://google.com",
  target: "_blank",
}

export const DisabledLink = Template.bind({})
DisabledLink.args = {
  children: "Visit Google",
  disabled: true,
  href: "https://google.com",
}
