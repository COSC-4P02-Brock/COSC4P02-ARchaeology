import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Icon } from "./Icon";

export default {
  title: "Components/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 100,
};

export const Medium = Template.bind({});
Medium.args = {
  size: 150,
};

export const Large = Template.bind({});
Large.args = {
  size: 200,
};

export const AcademicCap = Template.bind({});
AcademicCap.args = {
  name: 'app/assets/icons/academic-cap.svg',
  size: 150,
}

export const Window = Template.bind({});
Window.args = {
  name: 'app/assets/icons/window.svg',
  size: 150,
}
