import type { ButtonProps } from '../../services/types';

export function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
        <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
      </svg>
      <span>{children}</span>
    </button>
  );
}
