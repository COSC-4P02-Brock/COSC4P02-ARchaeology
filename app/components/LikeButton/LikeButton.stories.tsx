import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { LikeButton } from "./LikeButton";

export default {
  title: "Components/LikeButton",
  component: LikeButton,
} as ComponentMeta<typeof LikeButton>;

const Template: ComponentStory<typeof LikeButton> = (args) => <LikeButton {...args} />;

export const ZeroLikes = Template.bind({});
ZeroLikes.args = {
  children: "Like me",
  like: () => {},
  likeCount: 0,
};

export const OneLike = Template.bind({});
OneLike.args = {
  ...ZeroLikes.args,
  likeCount: 1,
};

export const TwoLikes = Template.bind({});
TwoLikes.args = {
  ...ZeroLikes.args,
  likeCount: 2,
};

export const HundredLikes = Template.bind({});
HundredLikes.args = {
  ...ZeroLikes.args,
  likeCount: 100,
};

export const ThousandLikes = Template.bind({});
ThousandLikes.args = {
  ...ZeroLikes.args,
  likeCount: 1000,
};

export const MillionLikes = Template.bind({});
MillionLikes.args = {
  ...ZeroLikes.args,
  likeCount: 1000000,
};
