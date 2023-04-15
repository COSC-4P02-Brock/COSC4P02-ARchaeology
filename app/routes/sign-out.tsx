import type { LoaderArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

import { destroySession } from "../utils.server";

export const loader = async ({ context, request }: LoaderArgs) => {
  return redirect("/sign-in", {
    headers: {
      "Set-Cookie": await destroySession(request, context),
    }
  });
}
