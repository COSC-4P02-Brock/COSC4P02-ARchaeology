import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Headline } from "./Headline";

export default {
  title: "Components/Headline",
  component: Headline,
} as ComponentMeta<typeof Headline>;

const Template: ComponentStory<typeof Headline> = (args) => <Headline {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  header: "Header",
  description: "this is a description",
  buttonText: "Take Action",
  primary: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  header: "Header",
  description: "this is a description",
  buttonText: "Take Action",
};

export const Large = Template.bind({});
Large.args = {
  header: "Header",
  description: "this is a description",
  buttonText: "Take Action",
  size: "large",
};

export const Small = Template.bind({});
Small.args = {
  header: "Header",
  description: "this is a description",
  buttonText: "Take Action",
  size: "small",
};
