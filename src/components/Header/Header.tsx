import './Header.css';

import { useRef } from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../Modal/Modal';

export function Header() {
  const { isShowing, toggle } = useModal();
  const modalRef = useRef<HTMLDivElement | null>(null);

  function openModal() {
    toggle();
  }

  return (
    <header className="header">
      <div className="main-wrapper">
        <button className="button" onClick={openModal}>
          <svg
            width="180px"
            height="60px"
            viewBox="0 0 180 60"
            className="border"
          >
            <polyline
              points="179,1 179,59 1,59 1,1 179,1"
              className="bg-line"
            />
            <polyline
              points="179,1 179,59 1,59 1,1 179,1"
              className="hl-line"
            />
          </svg>
          <span>Select additional columns</span>
        </button>
      </div>
      <Modal isShowing={isShowing} hide={toggle} modalRef={modalRef}>
        children
      </Modal>
    </header>
  );
}
