import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ToastContainer } from "react-toastify";

import { Footer } from "./components";
import { MuseumSiteInfo } from "./models";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import tippy from "tippy.js/dist/tippy.css";
import toast from "react-toastify/dist/ReactToastify.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
  { rel: "stylesheet", href: tippy },
  { rel: "stylesheet", href: toast },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "ARchaeology",
  viewport: "width=device-width,initial-scale=1",
});

const today = new Date();
const year = today.getFullYear();

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-6 lg:py-8">
          <Outlet />
        </main>
        <Footer currentYear={year.toLocaleString()} siteInfo={MuseumSiteInfo} />
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
