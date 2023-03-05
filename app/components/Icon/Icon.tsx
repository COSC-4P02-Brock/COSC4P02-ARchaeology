import * as icons from '@heroicons/react/24/solid'


interface IconProps {
  /**
   * The name of the icon to be loaded from module @heroicons/react/24/solid.
   */
  name?: string;

  /**
   * What color of the fill should the icon be?
   */
  iconColor?: string;

  /**
   * How large should the icon be? This will adjust both the width and the height to the input pixels.
   */
  size?: number;
}

/**
 * Example icon component
 */
export const Icon = ({
  name = 'BeakerIcon',
  iconColor = '#black',
  size = 100
}: IconProps) => {
  const CustomIcon = (icons as { [key: string]: any })[name]
  return (
    <div style={{color: iconColor, width: size, height: size}}>
      <CustomIcon />
    </div>
  )
};
