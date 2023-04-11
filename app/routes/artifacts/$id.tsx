import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { Artifact } from "../../components";
import { ArtifactService } from "../../services.server";

export const loader = async ({ context, params }: LoaderArgs) => {
  const service = new ArtifactService(context);
  const artifact = await service.getArtifact(params.id as string);
  return json(artifact);
};

export default function ArtifactId() {
  const artifact = useLoaderData<typeof loader>();

  return (
    <Artifact {...artifact} images={artifact.images.map(({ caption, id, url }) => ({
      alt: caption,
      id,
      name: caption,
      src: url,
    }))} like={() => undefined} modelUrl='' />
  )
}
