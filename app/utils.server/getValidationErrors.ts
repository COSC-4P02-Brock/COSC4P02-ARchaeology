import { ValidationError } from "yup";

type ValidationErrors = {
  data: { [key: string]: string };

  errors: { [key: string]: string } | undefined;
}

export function getValidationErrors(validationError: unknown) {
  if (!(validationError instanceof ValidationError)) {
    return undefined
  }

  const errors: { [key: string]: string } = {};

  validationError.inner.forEach(ve => {
    if (!ve.path) return
    errors[ve.path] = ve.message;
  });

  return errors;
}
