import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { DefinitionList } from "./DefinitionList";

export default {
  title: "Components/DefinitionList",
  component: DefinitionList,
} as ComponentMeta<typeof DefinitionList>;

const Template: ComponentStory<typeof DefinitionList> = (args) => <DefinitionList {...args} />;

export const Default = Template.bind({});
Default.args = {
  definitions: {
    'Term 1': 'This is the definition of term 1',
    'Term 2': 'This is the definition of term 2',
    'Term 3': 'This is the definition of term 3',
    'Term 4': 'This is the definition of term 4',
    'Term 5': 'This is the definition of term 5',
  },
};
