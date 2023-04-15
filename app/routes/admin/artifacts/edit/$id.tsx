import type { LoaderArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { Button, Input, Label, PageHeading, TextArea } from "../../../../components";
import { ArtifactService } from "../../../../services.server";

export const loader = async ({ context, params }: LoaderArgs) => {
  const service = new ArtifactService(context);
  const artifact = await service.getArtifact(params.id as string);
  return json(artifact);
}

export default function Edit() {
  const artifact = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <PageHeading
        title={`${artifact.name} – ${artifact.objectId}`}
        subtitle="Edit"
      />
      <form className="space-y-6" action="#" method="POST">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          required
          defaultValue={artifact.name}
        />
      </div>
      <div>
        <Label htmlFor="objectId">Object ID</Label>
        <Input
          id="objectId"
          name="objectId"
          type="text"
          autoComplete="off"
          required
          defaultValue={artifact.objectId}
        />
      </div>
      <div>
        <Label htmlFor="dimensions">Dimensions</Label>
        <Input
          id="dimensions"
          name="dimensions"
          type="text"
          autoComplete="off"
          required
          defaultValue={artifact.dimensions}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          name="description"
          autoComplete="off"
          required
          defaultValue={artifact.description}
          rows={20}
        />
      </div>
      <div>
        <Button type="submit">
          Update
        </Button>
        {' '}or{' '}
        <a className="text-blue-500 hover:underline" href="/admin/artifacts">
          cancel
        </a>
      </div>
    </form>
    </div>
  )
}
