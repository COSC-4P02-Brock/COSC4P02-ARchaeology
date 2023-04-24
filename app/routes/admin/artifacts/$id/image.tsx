import type { ActionArgs, LoaderArgs, UploadHandlerPart } from "@remix-run/cloudflare";
import {
  json,
  redirect,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
  unstable_composeUploadHandlers,
} from "@remix-run/cloudflare";
import { useActionData, useLoaderData, useTransition } from "@remix-run/react";

import {
  Button,
  Error as ErrorMessage,
  Input,
  InputError,
  Label,
  PageHeading,
  TextArea,
} from "../../../../components";
import { ArtifactService } from "../../../../services.server";
import { getToken, supabase } from "../../../../utils.server";

export async function loader({ context, params, request }: LoaderArgs) {
  const service = new ArtifactService(context);
  const artifact = await service.getArtifact(params.id as string);

  if (!artifact) {
    return redirect("/admin/artifacts");
  }

  return json({ artifact });
}

type ImageFormErrors = {
  caption?: string;

  image?: string;

  server?: string;
}

export async function action({ context, params, request }: ActionArgs) {
  const errors: ImageFormErrors = {};

  try {
    const token = await getToken(request, context);
    if (!token) {
      return redirect("/sign-in");
    }

    const uploadImageHandler = async ({ contentType, name, data: stream, filename }: UploadHandlerPart) => {
      if (name !== "image") {
        return undefined;
      }

      // Create file from parts
      const fileData = [];
      for await (const part of stream) {
        fileData.push(part);
      }

      const file = new File(fileData, filename || '', { type: contentType });

      const { data, error } = await supabase({
        SUPABASE_KEY: context.SERVICE_ROLE_KEY as string,
        SUPABASE_URL: context.SUPABASE_URL as string,
      })
        .storage
        .from("artifacts")
        .upload(
          `artifact-${params.id}-file-${filename}`,
          file
        );

      if (error) {
        return undefined;
      }

      if (data) {
        const { data: { publicUrl } } = supabase(context)
          .storage
          .from("artifacts")
          .getPublicUrl(data.path);
        return publicUrl;
      }
    }

    const uploadHandler = unstable_composeUploadHandlers(
      uploadImageHandler,
      unstable_createMemoryUploadHandler()
    );

    const form = await unstable_parseMultipartFormData(request, uploadHandler);
    const artifactId = form.get("artifactId");
    const caption = form.get("caption");
    const imageUrl = form.get("image");

    if (!imageUrl) {
      throw new Error("Unable to upload file");
    }

    const { error } = await (new ArtifactService(context)).addImageToArtifact({
      artifactId: artifactId as string,
      caption: caption as string,
      url: imageUrl as string,
    }, token as string);

    if (error) {
      throw new Error("Unable to create record");
    }

    return redirect(`/admin/artifacts/${params.id as string}`);
  } catch (error: any) {
    errors.server = "Oops! Something went wrong. Please try again later.";
    return json(errors, { status: 500 });
  }
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
      {errors?.server && <ErrorMessage message={errors?.server} />}
      <form className="space-y-6" method="POST" encType="multipart/form-data">
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
          <InputError message={errors?.caption} />
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
          <InputError message={errors?.image} />
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
