import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { ArtifactService } from "../services.server";

export const loader = async ({ context }: LoaderArgs) => {
  const service = new ArtifactService(context);
  const artifacts = await service.getArtifacts();
  return json(artifacts);
}

export default function Index() {
  const artifacts = useLoaderData<typeof loader>();

  return (
    <ul>
      {artifacts.map(({ id, name }) => (
        <li key={id}>
          <a className="text-blue-500 hover:underline" href={`/artifacts/${id}`}>{name}</a>
        </li>
      ))}
    </ul>
  )
}
