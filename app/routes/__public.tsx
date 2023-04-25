import { Outlet } from "@remix-run/react";

import { Header } from "../components/Header"
import { Footer } from "../components/Footer";
import { MuseumSiteInfo } from "../models";

const today = new Date();
const year = today.getFullYear().toString();

export default function Layout() {
  return (
    <div className="min-h-full flex flex-col">
      <Header currentYear={year} siteInfo={MuseumSiteInfo}/>
      <main className="grow w-full mx-auto max-w-7xl sm:px-6 lg:px-8 pb-6 lg:pb-8">
        <Outlet />
      </main>
      <Footer currentYear={year} siteInfo={MuseumSiteInfo} />
    </div>
  )
}
