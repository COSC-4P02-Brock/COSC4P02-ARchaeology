import { json, redirect } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";
import { useActionData, useTransition } from "@remix-run/react";
import { object, string } from "yup";

import {
  Button,
  Error,
  Input,
  InputError,
  Label,
  Logo
} from "../../components";

import { AuthError, AuthService } from "../../services.server";
import { createSession, getValidationErrors } from "../../utils.server";

const GENERIC_ERROR_MESSAGE = "Oops. Something went wrong.";

async function extractFormData(request: ActionArgs['request']) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    return {
      formData: {
        email,
        password
      },
      serverError: undefined
    };
  } catch (error: unknown) {
    return {
      formData: {
        email: '',
        password: '',
      },
      serverError: GENERIC_ERROR_MESSAGE
    };
  }
}

async function validateFormData(formData: { email: string; password: string }) {
  const formDataSchema = object({
    email: string().email().required(),
    password: string().required(),
  });

  try {
    const validatedFormData = await formDataSchema.validate(formData, {
      abortEarly: false,
    });
    return {
      data: {
        form: validatedFormData,
      },
      errors: {}
    };
  } catch (error: unknown) {
    return {
      data: { form: formData },
      errors: { form: getValidationErrors(error) },
    };
  }
}

export async function action({ context, request }: ActionArgs) {
  const { formData, serverError } = await extractFormData(request);
  if (serverError) {
    return json(
      {
        data: {
          form: formData,
        },
        errors: {
          server: serverError,
        },
      },
      {
        status: 500,
      },
    );
  }

  const { data, errors } = await validateFormData(formData);
  if (Object.keys(errors).length > 0) {
    return json({
      data,
      errors,
    }, { status: 422 });
  }

  try {
    const sessionDetails = await (new AuthService(context)).signIn(
      data.form.email,
      data.form.password
    );
    const sessionCookie = await createSession(sessionDetails, context);
    return redirect("/admin", {
      headers: {
        "Set-Cookie": sessionCookie,
      },
    });
  } catch (error: unknown) {
    return {
      data: {
        form: formData,
      },
      errors: {
        server: (error instanceof AuthError)
          ? (error as AuthError).message
          : GENERIC_ERROR_MESSAGE,
      },
    };
  }
}

export default function SignIn() {
  const { data, errors } = useActionData() ?? {};
  const transition = useTransition();

  return (
    <>
      <div className="absolute w-full flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md">
          <a href="/" title="Return to home">
            <Logo theme="light" />
          </a>
          <h2 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">Sign In</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {errors?.server && (<Error message={errors.server} />)}

            <form className="space-y-6" action="#" method="POST">
              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={data?.form?.email}
                    required
                  />
                </div>
                <InputError message={errors?.form?.email} />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    defaultValue={data?.form?.password}
                    required
                  />
                </div>
                <InputError message={errors?.form?.password} />
              </div>

              <div>
                <Button
                  block
                  disabled={transition.state !== "idle"}
                  type="submit"
                >
                  {transition.state === "submitting" ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
