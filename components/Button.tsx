import { ReactNode } from 'react';
import LoadingIndicator from './LoadingIndicator';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: ReactNode;
}

function Button({
  disabled,
  loading,
  title,
  type = 'submit',
  icon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded border border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-2 text-white
      hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:bg-none disabled:text-gray-300 ${
        loading ? 'opacity-50' : ''
      } ${className ?? ''}`}
      disabled={disabled}
      type={type}
      {...props}
    >
      <>
        {loading && <LoadingIndicator />}
        {!loading && icon}
        {title}
      </>
    </button>
  );
}
export default Button;
