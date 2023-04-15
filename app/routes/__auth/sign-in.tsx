import { json, redirect } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";
import { useActionData, useTransition } from "@remix-run/react";

import { Button, Error, Logo } from "../../components";

import { AuthError, AuthService } from "../../services.server";
import { createSession } from "../../utils.server";

type SignInFormErrors = {
  email?: string;
  password?: string;
  server?: string;
}

export async function action({ context, request }: ActionArgs) {
  const errors: SignInFormErrors = {};

  console.log(context);

  try {
    const form = await request.formData();
    const email = form.get('email');
    const password = form.get('password');

    if (typeof email !== "string" || !email.match(/.+@.+/)) {
      errors.email = "Please enter a valid email address.";
    }

    if (typeof password !== "string" || password.length < 6) {
      errors.password = "Please enter a valid password.";
    }

    if (Object.keys(errors).length) {
      return json(errors, { status: 422 });
    }

    const sessionDetails = await (new AuthService(context)).signIn(
      email as string,
      password as string
    );
    
    return redirect("/", {
      headers: {
        "Set-Cookie": await createSession(sessionDetails, context),
      },
    });
  } catch (error: unknown) {
    errors.server = error instanceof AuthError
      ? (error as AuthError).message
      : "Oops! Something went wrong. Please try again later.";
    return json(errors, { status: 500 });
  }
}

export default function SignIn() {
  const errors = useActionData();
  const transition = useTransition();

  return (
    <>
      <div className="absolute w-full flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md">
          <Logo theme="light" />
          <h2 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">Sign In</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {errors?.server && (<Error message={errors.server} />)}

            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.email && <span>{errors.email}</span>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.password && <span>{errors.password}</span>}
              </div>

              <div>
                <Button
                  block
                  disabled={transition.state !== "idle"}
                  type="submit"
                >
                  {transition.state !== "idle" ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
