import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useFetcher, useLoaderData } from "@remix-run/react";

import { Artifact } from "../../components";
import { ArtifactService } from "../../services.server";

export const action = async ({ context, request }: ActionArgs) => {
  const form = await request.formData();
  if (form.get('action') !== 'like') {
    return;
  }

  const service = new ArtifactService(context);
  const result = await service.likeArtifact(form.get('id') as string);
  return json(result);
}

export const loader = async ({ context, params }: LoaderArgs) => {
  const service = new ArtifactService(context);
  const artifact = await service.getArtifact(params.id as string);
  return json(artifact);
};

export default function ArtifactId() {
  const artifact = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const onLike = () => {
    fetcher.submit({ action: 'like', id: String(artifact.id) }, { method: 'post' });
  }

  return (
    <Artifact {...artifact} images={artifact.images.map(({ caption, id, url }) => ({
      alt: caption,
      id,
      name: caption,
      src: url,
    }))} like={onLike} modelUrl='' />
  )
}
