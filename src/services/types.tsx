import type { CSSProperties } from 'react';

export type ButtonProps = {
  onClick?: () => void;
  children: string;
  style?: CSSProperties;
  className?: string;
};
