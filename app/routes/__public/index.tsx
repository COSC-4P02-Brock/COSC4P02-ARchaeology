import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { ImageOverlay } from "~/components/ImageOverlay";

import { ArtifactService } from "../../services.server";

export const loader = async ({ context }: LoaderArgs) => {
  const service = new ArtifactService(context);
  const artifacts = await service.getArtifacts();
  return json(artifacts);
}

export default function Index() {
  const artifacts = useLoaderData<typeof loader>();

  return (
    <ul className="grid grid-cols-4 justify-center place-items-center">
      {artifacts.map(({ id, image, name }) => (
        <li key={id}>
          <a className="text-blue-500" href={`/artifacts/${id}`}>
            <ImageOverlay url={image?.url ?? ""} text={name} alt={image?.caption ?? ""}/>
          </a>
        </li>
      ))}
    </ul>
  )
}
