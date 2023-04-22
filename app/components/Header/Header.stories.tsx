import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Header } from "./Header";
import { MuseumSiteInfo } from "../../models";

export default {
  title: "Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () =>
  <Header currentYear="2023" siteInfo={MuseumSiteInfo} />

export const Default = Template.bind({})
