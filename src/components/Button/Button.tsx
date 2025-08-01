import './Button.css';
import type { ButtonProps } from '../../services/types';

export function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
