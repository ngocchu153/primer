import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';

function LoadingIndicator() {
  return <Icon icon={faSpinner} spin />;
}

export default LoadingIndicator;
