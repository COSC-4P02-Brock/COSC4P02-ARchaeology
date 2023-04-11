import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Artifact } from "./Artifact";

export default {
  title: "Components/Artifact",
  component: Artifact,
} as ComponentMeta<typeof Artifact>;

const Template: ComponentStory<typeof Artifact> = (args) => <Artifact {...args} />

export const Default = Template.bind({});
Default.args = {
  date: "c. 1812-14",
  description: "<p>Officia pariatur ea fugiat excepteur. Elit incididunt sunt qui duis deserunt pariatur fugiat id do anim cupidatat. Sit labore aliquip nisi ea proident sit. Ullamco id ut culpa laborum reprehenderit laborum incididunt ex. Minim mollit mollit tempor Lorem eu reprehenderit magna voluptate sit dolor. Ipsum exercitation laborum qui eiusmod proident adipisicing excepteur laborum nulla anim. Qui nisi commodo magna labore eu amet et sunt nostrud laborum enim amet cillum.</p>\n" +
    "<p>Cupidatat quis deserunt minim sunt aliqua sint adipisicing deserunt dolore commodo veniam. Est nulla irure elit duis sint incididunt consequat nulla amet in proident. Cillum consequat tempor dolore do sunt non minim in. Mollit sint irure pariatur fugiat consequat id ut occaecat in. Laboris dolore esse consectetur labore consequat nulla aliquip nulla veniam nulla. Lorem ipsum irure veniam nulla deserunt dolore occaecat in excepteur. Mollit commodo Lorem occaecat velit cupidatat quis aliqua amet culpa.</p>\n",
  dimensions: "H: 8 1/2 in. W: 6 1/2 in. D: 1 1/2 in.",
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
  like: () => {},
  likeCount: 0,
  modelUrl: '/ar/toy_drummer_idle.usdz',
  name: "Axe",
  objectId: "999.999(B)"
}
