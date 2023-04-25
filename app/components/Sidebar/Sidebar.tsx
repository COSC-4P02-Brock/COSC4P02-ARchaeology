import * as React from "react";
import { NavLink } from "@remix-run/react";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";

import { Button } from "../Button";

type SidebarProps = {
  links: Array<{
    Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & {
      title?: string, titleId?: string
    }>;
    title: string;
    url: string;
  }>;

  user: {
    email: string;

    image: string;

    role: string;
  };
};

export const Sidebar = ({ links, user }: SidebarProps) => (
  <aside className="bg-slate-100 border-r border-slate-200 h-screen flex flex-col justify-between inset-0 px-2 py-4 w-16 sm:w-36 md:w-64 sticky">
    <div>
      <div className="flex flex-col items-center pb-4 mb-4 border-b border-slate-200">
        <img src="/img/logo-transparent.png" width="50%" height="auto" alt="" />
        <h1 className="hidden sm:block text-brown-800 uppercase font-bold m-0 leading-1 text-md"><span className="text-blue-500">AR</span>chaeology</h1>
        <h2 className="hidden sm:block text-slate-500 -mt-1 text-sm font-light">Admin Panel</h2>
      </div>
      <nav>
        <ul className="space-y-1">
          {links.map(({ Icon, title, url }) => (
            <li key={url}>
              <NavLink end to={url} className={({ isActive, isPending }) =>
                `${isActive ? 'bg-slate-200 text-slate-800' : 'bg-slate-100 text-slate-600 hover:text-slate-800'} text-sm flex group items-center justify-center sm:justify-start p-2 rounded-md duration-300 ease-out hover:ease-in transition-all`
              }>
                {({ isActive, isPending }) => (
                  <>
                    <Icon aria-hidden={true} className={
                      `${isActive ? 'text-slate-500' : 'text-slate-400 group-hover:text-slate-500 group-hover:ease-in transition duration-300'} sm:mr-3 h-6 w-6 flex-shrink-0`
                    } />
                    <span className="hidden sm:inline">{title}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    <div className="hidden sm:flex group items-center justify-between border-t border-slate-200 pt-4 mt-4">
      <img className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-300 mr-1" alt={user.role} src={user.image} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-slate-900">
          {user.email}
        </span>
        <span className="shrink">
          <Button inverse size="small" href="/sign-out">
            Sign Out
          </Button>
        </span>
      </span>
    </div>
    <div className="sm:hidden group">
      <Button inverse size="small" href="/sign-out">
        <ArrowLeftOnRectangleIcon className="h-6 w-6 text-slate-400 group-hover:text-slate-500" />
        <span className="sr-only">Sign Out</span>
      </Button>
    </div>
  </aside>
)
