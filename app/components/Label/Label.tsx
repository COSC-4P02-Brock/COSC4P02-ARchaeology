type LabelProps = {
  children: React.ReactNode;

  htmlFor: string;
};

export const Label = ({ children, htmlFor }: LabelProps) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-900">
    {children}
  </label>
);
