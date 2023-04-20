import type { Link } from "./Link";
import type { SocialMediaLink } from "./SocialMediaLink";

export interface SiteInfo {
  // The name of the site.
  name: string;

  // The links in the header menu.
  headerMenuLinks: Link[];

  // The links in the footer menu.
  footerMenuLinks: Link[];

  // The profiles of the site on social media services.
  socialMediaLinks: SocialMediaLink[];

  // The URL of the site.
  url: string;
}
