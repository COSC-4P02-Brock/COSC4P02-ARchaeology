import { useMemo } from "react";

import { Button } from "../Button";
import { Carousel } from "../Carousel";
import type { CarouselProps } from "../Carousel/Carousel";
import { LikeButton } from "../LikeButton";
import type { LikeButtonProps } from "../LikeButton";
import { DefinitionList } from "../DefinitionList";
import { Disclosure, DisclosureContainer } from "../Disclosure";
import { isMobileDevice } from "../../utils";

type ArtifactProps = Pick<LikeButtonProps, "like" | "likeCount"> & {
  /** The date/era that the artifact is from. */
  date: string;

  /** The description. */
  description: string;

  /** The dimensions of the artifact. */
  dimensions: string;

  /** The unique ID of the artifact. */
  id: number;

  /** Images of the artifact. */
  images: CarouselProps["images"];

  /** The URL to the AR model. */
  modelUrl: string;

  /** The name of the artifact. */
  name: string;

  /** The object id in the museum collection. */
  objectId: string;
}

/**
 * The artifact component displays images and details of the artifact.
 * It also links to an AR object, but only on iPhone and Android devices.
 */
export const Artifact = ({
  date,
  description,
  dimensions,
  images,
  like,
  likeCount,
  modelUrl,
  name,
  objectId,
}: ArtifactProps) => {
  const isMobile = useMemo(() => isMobileDevice(), [])

  return (
    <article>
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <Carousel images={images} />

        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{name}</h1>

          <div className="mt-3">
            <h2 className="sr-only">Date</h2>
            <p className="text-3xl tracking-tight text-gray-900">{date}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>

            <div
              className="space-y-6 text-base text-gray-700"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          <div className="mt-6">
            <div className="mt-10 flex gap-2">
              <Button
                disabled={!isMobile}
                href={modelUrl}
                primary
                type="submit"
              >
                View in AR{!isMobile && <sup>1</sup>}
              </Button>

              <LikeButton like={like} likeCount={likeCount}>
                Like this artifact
              </LikeButton>
            </div>
          </div>

          <section aria-labelledby="details-heading" className="mt-12">
            <h2 id="details-heading" className="sr-only">
              Details
            </h2>

            <DisclosureContainer>
              <Disclosure title="Details">
                <DefinitionList definitions={{
                  Name: name,
                  Date: date,
                  Dimensions: dimensions,
                  "Object ID": objectId,
                }} />
              </Disclosure>
            </DisclosureContainer>
          </section>

          {!isMobile && <span className="text-xs text-gray-600 mt-1"><sup>1</sup>AR supported on iPhone and Android devices only.</span>}
        </div>
      </div>
    </article>
  )
}
