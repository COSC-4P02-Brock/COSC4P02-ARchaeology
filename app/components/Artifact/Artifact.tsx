import { Tab } from "@headlessui/react";
import {
  HeartIcon,
} from '@heroicons/react/24/outline'
import { useMemo } from "react";

import { Button } from "../Button";
import { Carousel } from "../Carousel";
import type { CarouselProps } from "../Carousel/Carousel";
import { DefinitionList } from "../DefinitionList";
import { Disclosure, DisclosureContainer } from "../Disclosure";
import { isMobileDevice } from "../../utils";

type ArtifactProps = {
  /** The date/era that the artifact is from. */
  date: string,

  /** The description. */
  description: string;

  /** Additional details, such location and categorization. */
  details: { [key: string]: string };

  /** The unique ID of the artifact. */
  id: number;

  /** Images of the artifact. */
  images: CarouselProps["images"];

  /** The name of the artifact. */
  name: string;

  /** The provenance. */
  provenance: string;
}

/**
 * The artifact component displays images and details of the artifact.
 * It also links to an AR object, but only on iPhone and Android devices.
 */
export const Artifact = ({
  date,
  description,
  details,
  images,
  name,
  provenance
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

          <form className="mt-6">
            <div className="mt-10 flex gap-2">
              <Button
                primary
                type="submit"
                disabled={!isMobile}
              >
                View in AR
              </Button>

              <Button inverse type="button">
                <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>
          </form>

          <section aria-labelledby="details-heading" className="mt-12">
            <h2 id="details-heading" className="sr-only">
              Details
            </h2>

            <DisclosureContainer>
              <Disclosure title="Details">
                <DefinitionList definitions={{
                  Name: name,
                  Date: date,
                  ...details,
                }} />
              </Disclosure>
              <Disclosure title="Provenance">
                <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: provenance }} />
              </Disclosure>
            </DisclosureContainer>
          </section>
        </div>
      </div>
    </article>
  )
}
