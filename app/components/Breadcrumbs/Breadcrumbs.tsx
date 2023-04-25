type BreadcrumbsProps = {
  links: Array<{
    title: string;
    url: string;
  }>;
};

export const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  if (!links.length) {
    return null;
  }

  const end = links.length - 1;

  return (
    <nav className="flex border-t border-b border-gray-200 py-2 px-0.5">
      <ol className="flex items-center space-x-4 text-xs">
        {links.map(({ title, url }, index) => {
          return (
            <>
              <li key={`${title}1`}>
                <a className="text-gray-500 hover:underline" href={url}>
                  {title}
                </a>
              </li>
              {index !== end && (
                <li key={`${title}2`}>
                  <span className="text-gray-300">/</span>
                </li>
              )}
            </>
          )
        })}
      </ol>
    </nav>
  )
}
