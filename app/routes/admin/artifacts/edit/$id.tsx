import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useActionData, useLoaderData, useTransition } from "@remix-run/react";

import { Button, Error, Input, Label, PageHeading, TextArea } from "../../../../components";
import { ArtifactService } from "../../../../services.server";
import { getToken } from "../../../../utils.server";

export const loader = async ({ context, params }: LoaderArgs) => {
  const service = new ArtifactService(context);
  const artifact = await service.getArtifact(params.id as string);
  return json(artifact);
}

type EditFormErrors = {
  name?: string;
  objectId?: string;
  date?: string;
  dimensions?: string;
  description?: string;
  server?: string;
}

export async function action({ context, params, request }: ActionArgs) {
  const errors: EditFormErrors = {};

  try {
    const token = await getToken(request, context);
    if (!token) {
      return redirect("/sign-in");
    }

    const form = await request.formData();
    const name = form.get("name");
    const objectId = form.get("objectId");
    const date = form.get("date");
    const dimensions = form.get("dimensions");
    const description = form.get("description");

    if (typeof name !== "string" || name.length < 1) {
      errors.name = "Please enter a valid name.";
    }

    if (typeof objectId !== "string" || objectId.length < 1) {
      errors.objectId = "Please enter a valid object ID.";
    }

    if (typeof objectId !== "string" || objectId.length < 1) {
      errors.date = "Please enter a valid date.";
    }

    if (typeof dimensions !== "string" || dimensions.length < 1) {
      errors.dimensions = "Please enter valid dimensions.";
    }

    if (typeof description !== "string" || description.length < 1) {
      errors.description = "Please enter a valid description.";
    }

    if (Object.keys(errors).length) {
      return json(errors, { status: 422 });
    }

    const { data, error } = await (new ArtifactService(context)).updateArtifact(
      params.id as string,
      {
        date: date as string,
        name: name as string,
        objectId: objectId as string,
        dimensions: dimensions as string,
        description: description as string,
      },
      token as string,
    );

    if (error) {
      errors.server = error.message;
      return json(errors, { status: 500 });
    }

    return redirect("/admin/artifacts");

  } catch (error: unknown) {
    errors.server = "Oops! Something went wrong. Please try again later."
    return json(errors, { status: 500 });
  }
}

export default function Edit() {
  const errors = useActionData();
  const artifact = useLoaderData<typeof loader>();
  const transition = useTransition();

  return (
    <div className="space-y-6">
      <PageHeading
        title={`${artifact.name} – ${artifact.objectId}`}
        subtitle="Edit"
      />
      {errors?.server && <Error message={errors?.server} />}
      <form className="space-y-6" method="POST">
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
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="text"
            autoComplete="off"
            required
            defaultValue={artifact.date}
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
          <Button disabled={transition.state !== "idle"} type="submit">
            {transition.state !== "idle" ? "Updating..." : "Update"}
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
