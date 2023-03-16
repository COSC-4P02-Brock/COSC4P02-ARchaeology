import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Carousel } from "./Carousel";

export default {
  title: "Components/Carousel",
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />;

export const OneImage = Template.bind({});
OneImage.args = {
  images: [
    {
      alt: "Axe",
      id: 3,
      name: "Axe",
      src: "/img/axe3.jpg",
    },
  ],
}

export const MultipleImages = Template.bind({});
MultipleImages.args = {
  images: [
    {
      alt: "Axe",
      id: 1,
      name: "Axe",
      src: "/img/axe1.jpg",
    },
    {
      alt: "Axe",
      id: 2,
      name: "Axe",
      src: "/img/axe2.jpg",
    },
    {
      alt: "Axe",
      id: 3,
      name: "Axe",
      src: "/img/axe3.jpg",
    },
  ],
};