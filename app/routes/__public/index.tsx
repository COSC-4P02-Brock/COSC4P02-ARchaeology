import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Breadcrumbs, ImageOverlay } from "~/components";

import { ArtifactService } from "../../services.server";

export const loader = async ({ context }: LoaderArgs) => {
  const service = new ArtifactService(context);
  const artifacts = await service.getArtifacts();
  return json(artifacts);
}

export default function Index() {
  const artifacts = useLoaderData<typeof loader>();

  return (
    <div>
      <Breadcrumbs links={[
        {
          title: "Artifacts",
          url: "/",
        },
      ]} />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center place-items-center mt-4">
        {artifacts.map(({ id, image, name }) => (
          <li className="block w-full" key={id}>
            <a className="block text-blue-500" href={`/artifacts/${id}`}>
              <ImageOverlay url={image?.url ?? ""} text={name} alt={image?.caption ?? ""}/>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
