import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Disclosure, DisclosureContainer } from "./Disclosure";

export default {
  title: "Components/Disclosure",
  component: Disclosure,
  decorators: [
    (Story) => (
      <DisclosureContainer>
        <Story/>
      </DisclosureContainer>
    ),
  ],
} as ComponentMeta<typeof Disclosure>;

const Template: ComponentStory<typeof Disclosure> = (args) => (
  <>
    <Disclosure {...args} />
    <Disclosure {...args} />
  </>
)

export const Default = Template.bind({})
Default.args = {
  children: <div className="prose"><p>Content hidden by default</p></div>,
  title: "Contains content",
}
