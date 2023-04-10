import Tippy from "@tippyjs/react";
import type { TippyProps } from "@tippyjs/react";

import "tippy.js/dist/tippy.css";

type TooltipProps = Pick<TippyProps, "content" | "children">;

export const Tooltip = ({ children, content }: TooltipProps) => (
  <Tippy content={content}>
    <span>
      {children}
    </span>
  </Tippy>
)
