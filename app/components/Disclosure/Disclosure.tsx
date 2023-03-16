import classNames from "classnames";
import { Disclosure as BaseDisclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

type DisclosureProps = {
  children: ReactNode;

  title: string;
}

export const Disclosure = ({ children, title }: DisclosureProps) => (
  <BaseDisclosure as="div">
    {({ open }) => (
      <>
        <h3>
          <BaseDisclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
            <span
              className={classNames(
                open ? 'text-blue-600' : 'text-gray-900',
                'text-sm font-medium'
              )}
            >
              {title}
            </span>
            <span className="ml-6 flex items-center">
              {open ? (
                <MinusIcon
                  className="block h-6 w-6 text-blue-400 group-hover:text-blue-500"
                  aria-hidden="true"
                />
              ) : (
                <PlusIcon
                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              )}
            </span>
          </BaseDisclosure.Button>
        </h3>
        <BaseDisclosure.Panel as="div" className="pb-6">
          {children}
        </BaseDisclosure.Panel>
      </>
    )}
  </BaseDisclosure>
)

type DisclosureContainerProps = {
  children: ReactNode,
}

export const DisclosureContainer = ({ children }: DisclosureContainerProps) => (
  <div className="divide-y divide-gray-200 border-t">
    {children}
  </div>
)
