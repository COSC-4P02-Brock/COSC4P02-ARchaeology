type DefinitionListProps = {
  definitions: {
    [key: string]: string
  };
}

export const DefinitionList = ({ definitions }: DefinitionListProps) => (
  <dl className="flex flex-col gap-4">
    {Object.entries(definitions).map(([term, definition]) => (
      <div key={term}>
        <dt className="text-sm font-light text-gray-500">{term}</dt>
        <dd className="mt-1 text-sm text-gray-900">{definition}</dd>
      </div>
    ))}
  </dl>
)
