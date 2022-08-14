import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

export interface IconProps extends FontAwesomeIconProps {}

function Icon({ className, ...props }: IconProps) {
  return <FontAwesomeIcon className={`mr-2 ${className || ''}`} {...props} />;
}
export default Icon;
