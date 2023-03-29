import type { Link } from "./Link";
export interface SocialMediaLink extends Link {
  // The icon of the social media service.
  // Note: there are only these four icons in the project.
  icon: "facebook" | "instagram" | "twitter" | "youtube";
}
