import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tooltip } from "./Tooltip";

import "tippy.js/dist/tippy.css";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <span>Hover me</span>,
  content: "I'm a tooltip",
}
