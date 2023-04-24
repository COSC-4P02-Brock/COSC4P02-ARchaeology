import type { LoaderArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useActionData, useLoaderData, useTransition } from "@remix-run/react";
import QRCode from "react-qr-code";

import { Button, DefinitionList, PageHeading } from "../../../../components";
import { ArtifactService } from "../../../../services.server";

export const loader = async ({ context, params, request }: LoaderArgs) => {
  const service = new ArtifactService(context);
  const artifact = await service.getArtifact(params.id as string);

  if (!artifact) {
    return redirect("/admin/artifacts");
  }

  const url = request.url.replace("/admin/", "/");

  return json({ artifact, url });
}

export default function Artifact() {
  const { artifact, url } = useLoaderData<typeof loader>();

  function download() {
    // Adapted from https://github.com/rosskhanas/react-qr-code/issues/135#issuecomment-748064710
    const svg = document.getElementById("qrcode");
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return

    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `${artifact.id}-${artifact.name.replace(/s+/g, '')}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  }

  return (
    <div className="bg-white rounded-md shadow-sm space-y-6 px-6 py-8">
      <div className="border-b border-slate-100 pb-4">
        <PageHeading
          title={`${artifact.name} - ${artifact.objectId}`}
          subtitle="View"
        />
      </div>
      <div>
        <h3 className="text-sm font-light text-gray-500">QR Code</h3>
        <p className="mt-1 mb-4 text-sm text-gray-900">
          Download and print this QR and then place it somewhere in the museum.
          Visitors can scan it with their phone to view the record for this
          artifact.
        </p>
        <QRCode id="qrcode" value={url} />
        <div className="mt-1">
          <Button inverse onClick={download}>Download QR Code</Button>
        </div>
      </div>
      <DefinitionList
        definitions={{
          Name: artifact.name,
          "Object ID": artifact.objectId,
          Date: artifact.date,
          Dimensions: artifact.dimensions,
          Description: artifact.description,
        }}
      />
      <div>
        <h3 className="text-sm font-light text-gray-500">Images</h3>
        <ul className="grid grid-cols-4 gap-4 mt-1">
          {artifact.images.map(image => (
            <li key={image.id}>
              <div style={{ backgroundImage: `url("${image.url}")`, backgroundSize: "cover", paddingBottom: "62.5%", width: "100%" }} className="border-4 shadow-sm border-slate-200"/>
            </li>
          ))}
        </ul>
        <div className="mt-1">
          <Button inverse href={`/admin/artifacts/${artifact.id}/image`}>
            Add Image
          </Button>
        </div>
      </div>
    </div>
  )
}
