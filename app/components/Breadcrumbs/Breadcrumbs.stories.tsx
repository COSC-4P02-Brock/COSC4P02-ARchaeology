import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Breadcrumbs } from "./Breadcrumbs";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => <Breadcrumbs {...args} />

export const OneBreadcrumb = Template.bind({});
OneBreadcrumb.args = {
  links: [
    {
      title: "Artifacts",
      url: "#",
    },
  ],
};

export const TwoBreadcrumb = Template.bind({});
TwoBreadcrumb.args = {
  links: [
    {
      title: "Artifacts",
      url: "#",
    },
    {
      title: "Musket",
      url: "#",
    },
  ],
};
