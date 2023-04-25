import { SocialMediaIcon } from "../SocialMediaIcon";
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
          <Logo theme="light" />
        </a>

        <ul className="flex space-x-4 lg:space-x-6 xl:space-x-8">
          {headerMenuLinks.map(({ name, url }) => (
              <li className="pb-6" key={`${name}.${url}`}>
                <a className="text-lg leading-6 text-black hover:text-red-700"
                   data-testid="Header.HeaderMenuLink"
                   href={url}
                >
                  {name}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  </header>
)
