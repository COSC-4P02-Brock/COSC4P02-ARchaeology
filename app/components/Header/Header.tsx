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
  <header className="" aria-labelledby="header-heading">
    <h2 id="header-heading" className="sr-only">Header</h2>

    <div className="grid grid-cols-9 grid-rows-1">
      <div><a href={url} title={`Visit the ${name} website`}>
        <Logo theme="light" />
      </a> </div>
      <button type="button" className="flex"> ABOUT </button>
      <button type="button" className="flex"> VISIT </button>
      <button type="button" className="flex"> SHOP </button>
      <button type="button" className="flex"> RESEARCH </button>
      <button type="button" className="flex"> MEMBERS </button>
      <button type="button" className="flex"> WHAT'S ON </button>
      <button type="button" className="flex"> BLOG </button>
      <button type="button" className="flex"> CONTACT </button>
      <button type="button" className="flex"> DONATE </button>

      <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
        
        <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
          
        </p>
      </div>
    </div>
  </header>
)
