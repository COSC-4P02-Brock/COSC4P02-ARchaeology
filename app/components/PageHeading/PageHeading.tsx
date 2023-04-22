type PageHeadingProps = {
  subtitle?: string;
  title: string;
};

export const PageHeading = ({ subtitle, title }: PageHeadingProps) => (
  <h1>
    {subtitle && (<div className="text-sm leading-6 text-gray-500">
      {subtitle}
    </div>)}
    <div className="text-2xl font-semibold leading-6 text-gray-900">
      {title}
    </div>
  </h1>
)
