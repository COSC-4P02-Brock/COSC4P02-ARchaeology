import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Icon } from "./Icon";

export default {
  title: "Components/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const AcademicCap = Template.bind({});
AcademicCap.args = {
  name: 'AcademicCapIcon'
}

export const Window = Template.bind({});
Window.args = {
  name: 'WindowIcon'
}

export const Small = Template.bind({});
Small.args = {
  size: 50,
};

export const Medium = Template.bind({});
Medium.args = {
  size: 100,
};

export const Large = Template.bind({});
Large.args = {
  size: 150,
};

export const Red = Template.bind({});
Red.args = {
  iconColor: 'red'
}

export const Green = Template.bind({});
Green.args = {
  iconColor: 'green'
}