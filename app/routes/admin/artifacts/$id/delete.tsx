import type { ActionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";

import { ArtifactService } from "../../../../services.server";
import { getToken } from "../../../../utils.server";

export const action = async ({ context, request, params }: ActionArgs) => {
  switch (request.method) {
    case "DELETE":
      const token = await getToken(request, context);
      if (!token) {
        return json({ error: "Unauthorized." }, { status: 401 });
      }
      const service = new ArtifactService(context);
      return service.deleteArtifact(params.id as string, token);
    default:
      return json({ error: "Invalid request method." }, { status: 405 });
  }
}
