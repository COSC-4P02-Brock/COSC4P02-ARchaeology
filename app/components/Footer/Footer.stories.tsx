import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Footer } from "./Footer";
import { MuseumSiteInfo } from "../../models";

export default {
  title: "Components/Footer",
  component: Footer,
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = () =>
  <Footer currentYear="2023" siteInfo={MuseumSiteInfo} />

export const Default = Template.bind({})
