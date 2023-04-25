import { useState } from "react";
import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { toast } from "react-toastify";

import { Artifact, Breadcrumbs } from "../../../components";
import { ArtifactService } from "../../../services.server";

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

  const [likeCount, setLikeCount] = useState(artifact.likeCount);
  const [liked, setLiked] = useState(false);

  const onLike = async () => {
    try {
      const response = await fetch(`/artifacts/${artifact.id}/like`, { method: 'put' });
      const result: { error: any } = await response.json();
      if (result.error) {
        throw new Error('Error liking artifact');
      }
      toast.success("Liked artifact");
      setLikeCount(likeCount + 1);
      setLiked(true);
    } catch (e) {
      toast.error("Error liking artifact");
    }
  }

  return (
    <>
      <Breadcrumbs links={[
        {
          title: "Artifacts",
          url: "/",
        },
        {
          title: artifact.name,
          url: `/artifacts/${artifact.id}`,
        },
      ]} />
      <div className="mt-4">
        <Artifact {...artifact} images={artifact.images.map(({ caption, id, url }) => ({
          alt: caption,
          id,
          name: caption,
          src: url,
        }))} like={liked ? undefined : onLike} likeCount={likeCount} modelUrl={artifact.arImage?.url} />
      </div>
    </>
  )
}
