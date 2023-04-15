import { json, redirect } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";
import { useActionData, useTransition } from "@remix-run/react";

import { AuthError, AuthService } from "../services.server";
import { createSession } from "../utils.server";

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
    <form method="post">
      {errors?.server ? (
        <p className="text-red-500">
          {errors?.server}
        </p>
      ) : ''}
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        {errors?.email && <span>{errors.email}</span>}
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        {errors?.password && <span>{errors.password}</span>}
      </div>

      <button disabled={transition.state !== "idle"} type="submit">
        {transition.state !== "idle" ? "Signing in..." : "Sign in"}
      </button>
    </form>
  )
}
