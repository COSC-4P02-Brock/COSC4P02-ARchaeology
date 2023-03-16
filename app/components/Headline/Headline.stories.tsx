import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Headline } from "./Headline";

export default {
  title: "Components/Button",
  component: Headline,
} as ComponentMeta<typeof Headline>;

const Template: ComponentStory<typeof Headline> = (args) => <Headline {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Headline",
  primary: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Click me",
};

export const Large = Template.bind({});
Large.args = {
  children: "Click me",
  size: "large",
};

export const Small = Template.bind({});
Small.args = {
  children: "Click me",
  size: "small",
};
