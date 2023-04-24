import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

type WarningProps = {
  children: React.ReactNode;
}

export const Warning = ({ children }: WarningProps) => (
  <div className="border-l-4 border-yellow-400 bg-yellow-50">
    <div className="flex p-4 border border-yellow-400">
      <div className="flex-shrink-0">
        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div className="ml-3">
        <p className="text-sm text-yellow-700">
          {children}
        </p>
      </div>
    </div>
  </div>
)
