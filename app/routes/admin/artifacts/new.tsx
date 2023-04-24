import type { ActionArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useActionData, useTransition } from "@remix-run/react";

import {
  Button,
  Error as ErrorMessage,
  Input,
  InputError,
  Label,
  PageHeading,
  TextArea,
} from "../../../components";
import { ArtifactService } from "../../../services.server";
import { getToken } from "../../../utils.server";

type NewFormErrors = {
  name?: string;
  objectId?: string;
  date?: string;
  dimensions?: string;
  description?: string;
  server?: string;
}

export async function action({ context, request }: ActionArgs) {
  const errors: NewFormErrors = {};

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

    if (typeof date !== "string" || date.length < 1) {
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

    const { data, error } = await (new ArtifactService(context)).createArtifact(
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

    return (data as any)?.id ? redirect(`/admin/artifacts/${(data as any).id}`) : redirect("/admin/artifacts");
  } catch (error: any) {
    errors.server = "Oops! Something went wrong. Please try again later.";
    return json(errors, { status: 500 });
  }
}

export default function New() {
  const errors = useActionData();
  const transition = useTransition();

  return (
    <div className="bg-white rounded-md shadow-sm space-y-6 px-6 py-8">
      <div className="border-b border-slate-100 pb-4">
        <PageHeading
          title="Artifact"
          subtitle="New"
        />
      </div>
      {errors?.server && <ErrorMessage message={errors?.server} />}
      <form className="space-y-6" method="POST">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            required
          />
          <InputError message={errors?.name} />
        </div>
        <div>
          <Label htmlFor="name">Object ID</Label>
          <Input
            id="objectId"
            name="objectId"
            type="text"
            autoComplete="off"
            required
          />
          <InputError message={errors?.objectId} />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="text"
            autoComplete="off"
            required
          />
          <InputError message={errors?.date} />
        </div>
        <div>
          <Label htmlFor="name">Dimensions</Label>
          <Input
            id="dimensions"
            name="dimensions"
            type="text"
            autoComplete="off"
            required
          />
          <InputError message={errors?.dimensions} />
        </div>
        <div>
          <Label htmlFor="name">Description</Label>
          <TextArea
            id="description"
            name="description"
            autoComplete="off"
            required
            rows={20}
          />
          <InputError message={errors?.description} />
        </div>
        <div>
          <Button primary disabled={transition.state !== "idle"} type="submit">
            {transition.state !== "idle" ? "Creating..." : "Create"}
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
