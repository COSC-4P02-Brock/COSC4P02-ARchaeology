import { json, redirect } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";
import { useActionData, useTransition } from "@remix-run/react";

import {
  Button,
  Error,
  Input,
  InputError,
  Label,
  Logo
} from "../../components";

import { AuthError, AuthService } from "../../services.server";
import { createSession } from "../../utils.server";

type SignInFormErrors = {
  email?: string;
  password?: string;
  server?: string;
}

export async function action({ context, request }: ActionArgs) {
  const errors: SignInFormErrors = {};

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
    
    return redirect("/admin", {
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
                    required
                  />
                </div>
                <InputError message={errors?.email} />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </div>
                <InputError message={errors?.password} />
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
