import * as React from "react";
import { NavLink } from "@remix-run/react";

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
  <aside className="bg-slate-100 border-r border-slate-200 fixed flex flex-col justify-between inset-0 px-2 py-4 w-64">
    <nav>
      <ul className="space-y-1">
        {links.map(({ Icon, title, url }) => (
          <li key={url}>
            <NavLink end to={url} className={({ isActive, isPending }) =>
              `${isActive ? 'bg-slate-200 text-slate-800' : 'bg-slate-100 text-slate-600 hover:text-slate-800'} text-sm flex group items-center p-2 rounded-md duration-300 ease-out hover:ease-in transition-all`
            }>
              {({ isActive, isPending }) => (
                <>
                  <Icon aria-hidden={true} className={
                    `${isActive ? 'text-slate-500' : 'text-slate-400 group-hover:text-slate-500 group-hover:ease-in transition duration-300'} mr-3 h-6 w-6 flex-shrink-0`
                  } />
                  {title}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
    <div className="group flex items-center justify-between border-t border-slate-200 pt-4 mt-4">
      <img className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-300 mr-1" alt={user.role} src={user.image} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-slate-900">
          {user.email}
        </span>
        <span className="truncate text-sm text-slate-500">
          {user.role} | <a href="/sign-out">Sign Out</a>
        </span>
      </span>
    </div>
  </aside>
)
