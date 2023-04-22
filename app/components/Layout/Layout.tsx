import { Outlet } from "@remix-run/react";

import { Footer } from "../Footer";
import { MuseumSiteInfo } from "../../models";

const today = new Date();
const year = today.getFullYear();

export default function Layout() {
  return (
    <>
      <main className="grow mx-auto max-w-7xl sm:px-6 lg:px-8 py-6 lg:py-8">
        <Outlet />
      </main>
      <Footer currentYear={year.toLocaleString()} siteInfo={MuseumSiteInfo} />
    </>
  )
}
