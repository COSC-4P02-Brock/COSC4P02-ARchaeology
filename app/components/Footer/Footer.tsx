import { SocialMediaIcon } from "../SocialMediaIcon";
import { Logo } from "../Logo";
import type { SiteInfo } from "~/models";

type FooterProps = {
  currentYear: string;

  siteInfo: SiteInfo;
}

export const Footer = ({
 currentYear,
 siteInfo: {
   footerMenuLinks,
   name,
   socialMediaLinks,
   url,
 },
}: FooterProps) => (
  <footer className="bg-gray-900" aria-labelledby="footer-heading">
    <h2 id="footer-heading" className="sr-only">Footer</h2>

    <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
      <div className="flex flex-col items-center">
        <a href={url} title={`Visit the ${name} website`}>
          <Logo theme="dark" />
        </a>

        <nav className="mt-12 -mb-6 flex justify-center space-x-4 sm:space-x-12">
          {footerMenuLinks.map(({ name, url }) => (
            <div className="pb-6" key={`${name}.${url}`}>
              <a className="text-sm leading-6 text-gray-300 hover:text-white"
                 data-testid="Footer.FooterMenuLink"
                 href={url}
              >
                {name}
              </a>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
        <div className="flex space-x-6 md:order-2">
          {socialMediaLinks.map(({ icon, name, url }) => (
            <a className="text-gray-500 hover:text-gray-400"
               data-testid="Footer.SocialMediaLink"
               href={url}
               key={`${name}.${url}`}
               target="_blank"
               title={`Visit us on ${name}`}
            >
              <span className="sr-only">{name}</span>
              <SocialMediaIcon icon={icon} />
            </a>
          ))}
        </div>
        <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
          &copy; {currentYear} {name}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)
