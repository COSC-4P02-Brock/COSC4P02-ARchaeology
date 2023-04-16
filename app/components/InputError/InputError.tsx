type InputErrorProps = {
  message?: string;
}

export const InputError = ({ message }: InputErrorProps) =>
  message ? (
    <span className="text-sm text-red-500">{message}</span>
  ) : null;
