import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

import { destroySession } from "../utils.server";

export const action = async ({ context, request }: ActionArgs) => {
  return redirect("/sign-in", {
    headers: {
      "Set-Cookie": await destroySession(request, context),
    },
  });
}

export const loader = async ({ context, request }: LoaderArgs) => {
  return redirect("/sign-in", {
    headers: {
      "Set-Cookie": await destroySession(request, context),
    }
  });
}
