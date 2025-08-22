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
  modalRef: React.RefObject<HTMLDivElement | null>;
};

export type CountryStore = {
  countries: string[];
  selectedCountry: string | null;
  setCountries: (list: string[]) => void;
  setSelectedCountry: (country: string) => void;
};
