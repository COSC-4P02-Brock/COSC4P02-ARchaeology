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
   name,
   url,
 },
}: HeaderProps) => (
  <header className="bg-gray-900" aria-labelledby="footer-heading">
    <h2 id="header-heading" className="sr-only">Header</h2>

    <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
      <div className="flex flex-col items-center">
        <a href={url} title={`Visit the ${name} website`}>
          <Logo theme="dark" />
        </a>

    
      </div>

      <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
        
        <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
          &copy; {currentYear} {name}. All rights reserved.
        </p>
      </div>
    </div>
  </header>
)
