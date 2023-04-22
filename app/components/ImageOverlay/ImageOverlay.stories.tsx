import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { ImageOverlay } from "./ImageOverlay";

export default {
  title: "Components/ImageOverlay",
  component: ImageOverlay,
} as ComponentMeta<typeof ImageOverlay>;

const Template: ComponentStory<typeof ImageOverlay> = (args) => <ImageOverlay {...args} />;

export const Primary = Template.bind({});
Primary.args = {
}