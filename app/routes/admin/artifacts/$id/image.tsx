import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useActionData, useLoaderData, useTransition } from "@remix-run/react";

import {
  Button,
  Error,
  Input,
  InputError,
  Label,
  PageHeading,
  TextArea,
} from "../../../../components";
import { ArtifactService } from "../../../../services.server";
import { getToken } from "../../../../utils.server";

export async function loader({ context, params, request }: LoaderArgs) {
  const service = new ArtifactService(context);
  const artifact = await service.getArtifact(params.id as string);

  if (!artifact) {
    return redirect("/admin/artifacts");
  }

  return json({ artifact });
}

export default function Image() {
  const errors = useActionData();
  const { artifact } = useLoaderData<typeof loader>();
  const transition = useTransition();

  return (
    <div className="bg-white rounded-md shadow-sm space-y-6 px-6 py-8">
      <div className="border-b border-slate-100 pb-4">
        <PageHeading
          title={`${artifact.name} – ${artifact.objectId}`}
          subtitle="Add image"
        />
      </div>
      <form className="space-y-6" method="POST">
        <input type="hidden" id="artifactId" name="artifactId" value={artifact.id} />
        <div>
          <label htmlFor="caption">Caption</label>
          <Input
            id="caption"
            name="caption"
            type="text"
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image</label><br />
          <input
            accept="image/*"
            id="image"
            name="image"
            type="file"
            autoComplete="off"
            required
          />
        </div>
        <div>
          <Button disabled={transition.state !== "idle"} type="submit" primary>
            {transition.state !== "idle" ? "Uploading" : "Upload" }
          </Button>
          {' '}or{' '}
          <a className="text-blue-500 hover:underline" href={`/admin/artifacts/${artifact.id}`}>
            cancel
          </a>
        </div>
      </form>
    </div>
  )
}