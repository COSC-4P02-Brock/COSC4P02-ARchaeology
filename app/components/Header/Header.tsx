import { Menu } from '@headlessui/react'
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

import { Logo } from "../Logo";
import type { SiteInfo } from "~/models";

type HeaderProps = {
  currentYear: string;

  siteInfo: SiteInfo;
}

export const Header = ({
 currentYear,
 siteInfo: {
   headerMenuLinks,
   name,
   url,
 },
}: HeaderProps) => (
  <header aria-labelledby="header-heading">
    <h2 id="header-heading" className="sr-only">Header</h2>

    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
      <nav className="flex items-center justify-between w-100">
        <a href={url} title={`Visit the ${name} website`}>
          <Logo className="h-24" theme="light" />
        </a>

        <ul className="hidden lg:flex space-x-4 lg:space-x-6 xl:space-x-8">
          {headerMenuLinks.map(({ name, url }) => (
              <li key={`${name}.${url}`}>
                <a className="text-lg leading-6 text-blue-900 hover:text-red-700"
                   data-testid="Header.HeaderMenuLink"
                   href={url}
                >
                  {name}
                </a>
              </li>
            ))}
        </ul>

        <div className="lg:hidden relative">
          <Menu>
            <Menu.Button>
              <Bars3Icon className="w-12 h-12" aria-hidden="true" />
              <span className="sr-only">Menu</span>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100 z-50">
              {headerMenuLinks.map(({ name, url }) => (
                <Menu.Item key={`${name}.${url}`} as={Fragment}>
                  <a href={url} className="text-blue-900 hover:text-red-700 flex w-full items-center rounded-md px-2 py-2 text-sm">
                    {name}
                  </a>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
      </nav>
    </div>
  </header>
)
