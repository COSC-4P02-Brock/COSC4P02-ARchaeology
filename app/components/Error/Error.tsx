type ErrorProps = {
  message: string;
}

export function Error({ message }: ErrorProps) {
  return (
    <div className="rounded-md bg-red-50 p-4 mb-4">
      <div className="text-sm text-red-700">
        {message}
      </div>
    </div>
  )
}
