import type { ReactNode } from 'react';

export type DataValues = {
  country: string;
  iso_code: string;
  year: number;
  population: number | null;
  co2: number | null;
  co2_per_capita: number | null;
};

export type ModalProps = {
  isShowing: boolean;
  hide: () => void;
  children: ReactNode;
  modalRef: React.RefObject<HTMLDivElement | null>;
};

export type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export type AddColumnsProps = {
  hide: () => void;
};
