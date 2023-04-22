import type { SiteInfo } from "~/models";

type AdminFooterProps = {
  currentYear: string;

  siteInfo: SiteInfo;
}

export const AdminFooter = ({ currentYear, siteInfo }: AdminFooterProps) => (
  <footer className="bg-white">
    <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
      <div className="flex justify-center space-x-6 md:order-2">
        <a className="text-red-500 text-xs leading-5 hover:underline" href="/sign-out">Sign out</a>
      </div>
      <div className="mt-8 md:order-1 md:mt-0">
        <p className="text-center text-xs leading-5 text-gray-500">
          &copy; {currentYear} {siteInfo.name}, Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
