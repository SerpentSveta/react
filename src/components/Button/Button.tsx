import './Button.css';
import type { ButtonProps } from '../../services/types';

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
