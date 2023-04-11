import {
  HeartIcon,
} from "@heroicons/react/24/outline";

import { Button } from "../Button";
import { Tooltip } from "../Tooltip";

import { pluralize as basePluralize } from "../../utils";

export type LikeButtonProps = {
  /** Accessible label. Visible to screen readers only. */
  children: string;

  /** Action to like the artifact. */
  like?: () => void;

  /** The number of times the artifact has been liked. */
  likeCount: number;
}

const pluralize = basePluralize.bind(null, { plural: 'likes', singular: 'like' });

export const LikeButton = ({ children, like, likeCount }: LikeButtonProps) => (
  <Tooltip content={pluralize(likeCount)}>
    <Button disabled={typeof like === "undefined"} inverse onClick={like} type="button">
      <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
      <span className="sr-only">{children}</span>
    </Button>
  </Tooltip>
)
