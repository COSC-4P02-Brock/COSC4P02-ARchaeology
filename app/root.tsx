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

export default function App() {
  return (
    <html lang="en" className="bg-gray-50">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <Outlet />
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
