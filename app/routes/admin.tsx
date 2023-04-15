import { json, redirect } from "@remix-run/cloudflare";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";

import { AdminFooter, AdminHeader } from "../components";
import { MuseumSiteInfo } from "../models";

import { getToken } from "../utils.server";

const today = new Date();
const year = today.getFullYear().toString();

export const loader = async ({ context, request }: LoaderArgs) => {
  const token = await getToken(request, context);
  if (!token) {
    return redirect("/sign-in");
  }
  return json({ token });
};

export default function Admin() {
  const { token } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col grow space-y-6">
      <AdminHeader name={MuseumSiteInfo.name} />
      <main className="grow w-full mx-auto max-w-7xl sm:px-6 lg:px-8 py-6 lg:py-8">
        <Outlet context={{ token }} />
      </main>
      <AdminFooter currentYear={year} siteInfo={MuseumSiteInfo} />
    </div>
  )
}
