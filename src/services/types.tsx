import type { CSSProperties, ReactNode } from 'react';

export type ButtonProps = {
  onClick?: () => void;
  children: string;
  style?: CSSProperties;
  className?: string;
};

export type ModalProps = {
  isShowing: boolean;
  hide: () => void;
  children: ReactNode;
};
