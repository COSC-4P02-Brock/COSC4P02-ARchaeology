import type { ActionArgs,  } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";

import { ArtifactService } from "../../../services.server";


export const action = async ({ context, request, params }: ActionArgs) => {
  const service = new ArtifactService(context);
  const result = await service.likeArtifact(params.id as string);

  return json(result);
}
