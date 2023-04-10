import {
  HeartIcon,
} from '@heroicons/react/24/outline'

import { Button } from "../Button";
import { Tooltip } from "../Tooltip";

export type LikeButtonProps = {
  /** Accessible label. Visible to screen readers only. */
  children: string;

  /** Action to like the artifact. */
  like: () => void;

  /** The number of times the artifact has been liked. */
  likeCount: number;
}

export const LikeButton = ({ children, like, likeCount }: LikeButtonProps) => (
  <Tooltip content={`${likeCount} ${likeCount === 1 ? 'like' : 'likes'}`}>
    <Button inverse onClick={like} type="button">
      <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
      <span className="sr-only">{children}</span>
    </Button>
  </Tooltip>
)
