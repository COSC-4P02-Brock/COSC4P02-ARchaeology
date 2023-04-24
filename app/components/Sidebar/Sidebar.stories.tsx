import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { BuildingLibraryIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { Sidebar } from "./Sidebar";

export default {
  title: "components/Sidebar",
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

function Blank() {
  return null
}

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <MemoryRouter initialEntries={["/artifacts"]}>
    <Sidebar {...args} />
    <Routes>
      <Route path="/users" element={<Blank />} />
      <Route path="/artifacts" element={<Blank />} />
    </Routes>
  </MemoryRouter>
)

export const Default = Template.bind({});
Default.args = {
  links: [
    {
      Icon: BuildingLibraryIcon,
      title: "Artifacts",
      url: "/artifacts",
    },
    {
      Icon: UserGroupIcon,
      title: "Users",
      url: "/users",
    },
  ],
  user: {
    email: "ad01cd@brocku.ca",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
    role: "Authenticated",
  }
};
