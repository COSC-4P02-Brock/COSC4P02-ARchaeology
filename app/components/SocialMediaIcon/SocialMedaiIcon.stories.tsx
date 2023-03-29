import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SocialMediaIcon } from "./SocialMediaIcon";

export default {
  title: "Components/SocialMediaIcon",
  component: SocialMediaIcon,
} as ComponentMeta<typeof SocialMediaIcon>

const Template: ComponentStory<typeof SocialMediaIcon> = ({ icon }) => (
  <SocialMediaIcon icon={icon} />
)

export const Facebook = Template.bind({})
Facebook.args = {
  icon: "facebook",
}

export const Instagram = Template.bind({})
Instagram.args = {
  icon: "instagram",
}

export const Twitter = Template.bind({})
Twitter.args = {
  icon: "twitter",
}

export const YouTube = Template.bind({})
YouTube.args = {
  icon: "youtube",
}
