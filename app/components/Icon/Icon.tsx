import React from 'react';
import * as icons from '@heroicons/react/24/solid'


interface IconProps {
  /**
   * The path to the .svg file.
   */
  name?: string;

  /**
   * What color of the fill should the icon be?
   */
  iconColor?: string;

  /**
   * How large should the icon be?
   */
  size?: number;
}

/**
 * Example icon component
 */
export const Icon = ({
  name = 'BeakerIcon',
  size = 200
}: IconProps) => {
  const Icon = (icons as { [key: string]: any })['name']
return (
  <div>
    <Icon />
  </div>
)};
