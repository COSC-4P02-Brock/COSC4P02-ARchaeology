import type { ActionArgs, LoaderArgs, UploadHandlerPart } from "@remix-run/cloudflare";
import {
  json,
  redirect,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
  unstable_composeUploadHandlers
} from "@remix-run/cloudflare";
import { useActionData, useLoaderData, useTransition } from "@remix-run/react";

import {
  Button,
  Error as ErrorMessage,
  InputError,
  Label,
  PageHeading,
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
        .from("ar_artifacts")
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
          .from("ar_artifacts")
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
    const imageUrl = form.get("image");
    const previousImageUrl = form.get("previousImage");

    if (!imageUrl) {
      throw new Error("Unable to upload file");
    }

    const { error } = await (new ArtifactService(context)).addArImageToArtifact({
      artifactId: artifactId as string,
      url: imageUrl as string
    }, token as string);

    if (error) {
      console.error(error);
      throw new Error("Unable to create record");
    }

    // Try to delete original image.
    if (previousImageUrl) {
      try {
        const urlSegments = (previousImageUrl as string).split("/")
        const { error } = await supabase({
          SUPABASE_KEY: context.SERVICE_ROLE_KEY as string,
          SUPABASE_URL: context.SUPABASE_URL as string,
        })
          .storage
          .from("ar_artifacts")
          .remove([urlSegments[urlSegments.length - 1]]);
        if (error) {
          throw new Error("Supabase failed to delete image");
        }
      } catch (error: any) {
        // Silently fail. At this point the upload of the new image worked
        // so this means we have an unused image stored in the storage bucket.
        console.error(error)
      }
    }

    return redirect(`/admin/artifacts/${params.id as string}`);
  } catch (error: any) {
    errors.server = "Oops! Something went wrong. Please try again later.";
    return json(errors, { status: 500 });
  }
}

export default function Model() {
  const errors = useActionData();
  const { artifact } = useLoaderData<typeof loader>();
  const transition = useTransition();

  return (
    <div className="bg-white rounded-md shadow-sm space-y-6 px-6 py-8">
      <div className="border-b border-slate-100 pb-4">
        <PageHeading
          title={`${artifact.name} - ${artifact.objectId}`}
          subtitle="Add AR image"
        />
      </div>
      {errors?.server && <ErrorMessage message={errors?.server} />}
      <form className="space-y-6" method="POST" encType="multipart/form-data">
        <input type="hidden" id="artifactId" name="artifactId" value={artifact.id} />
        <input type="hidden" id="previousImage" name="previousImage" value={artifact.arImage?.url} />
        <div>
          <Label htmlFor="image">Image</Label>
          <input
            accept="model/vnd.usdz+zip"
            id="image"
            name="image"
            type="file"
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
