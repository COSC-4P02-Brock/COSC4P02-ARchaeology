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
  <header className="" aria-labelledby="header-heading">
    <h2 id="header-heading" className="sr-only">Header</h2>

    <div className="grid grid-cols-9 grid-rows-1">
      <div><a href={url} title={`Visit the ${name} website`}>
        <Logo theme="light" />
      </a> </div>
      

      <div className="mt-12 -mb-6 flex justify-center space-x-4 sm:space-x-12">
        {headerMenuLinks.map(({ name, url }) => (
            <div className="pb-6" key={`${name}.${url}`}>
              <a className="text-sm leading-6 text-gray-300 hover:text-white"
                 data-testid="Header.HeaderMenuLink"
                 href={url}
              >
                {name}
              </a>
            </div>
          ))}
      </div>
    </div>
  </header>
)
