import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Error } from "./Error";

export default {
  title: "Components/Error",
  component: Error,
} as ComponentMeta<typeof Error>

const Template: ComponentStory<typeof Error> = ({ message }) => (
  <Error message={message} />
)

export const Default = Template.bind({})
Default.args = {
  message: 'Oops! Something went wrong. Please try again later.',
}
