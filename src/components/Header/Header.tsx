import './Header.css';

import { useRef } from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../Modal/Modal';
import { AddColumns } from '../AddColumns/AddRows';
import { Button } from '../Button/Button';
import { useTableStore } from '../../store/useTableStore';

export function Header() {
  const { isShowing, toggle } = useModal();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const query = useTableStore((state) => state.query);
  const setQuery = useTableStore((state) => state.setQuery);

  function openModal() {
    toggle();
  }

  return (
    <header className="header">
      <div className="main-wrapper">
        <input
          type="text"
          placeholder="Search country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button className="button" onClick={openModal}>
          Select additional columns
        </Button>
      </div>
      <Modal isShowing={isShowing} hide={toggle} modalRef={modalRef}>
        <AddColumns hide={toggle} />
      </Modal>
    </header>
  );
}
