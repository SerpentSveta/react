import { useState, useRef, useEffect } from 'react';

import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { UncontrolledForm } from '../../forms/UncontrolledForm/UncontrolledForm';
import { ControlledForm } from '../../forms/ControlledForm/ControlledForm';
import { useModal } from '../../hooks/useModal';

export function Header() {
  const { isShowing, toggle } = useModal();
  const [activeForm, setActiveForm] = useState<
    'uncontrolled' | 'controlled' | null
  >(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isShowing &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toggle();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShowing]);

  function openUncontrolledForm() {
    setActiveForm('uncontrolled');
    toggle();
  }

  function openControlledForm() {
    setActiveForm('controlled');
    toggle();
  }

  return (
    <header className="header">
      <Button onClick={openUncontrolledForm}>Uncontrolled Form</Button>
      <Button onClick={openControlledForm}>Controlled Form</Button>
      <Modal isShowing={isShowing} hide={toggle} modalRef={modalRef}>
        {activeForm === 'uncontrolled' && <UncontrolledForm />}
        {activeForm === 'controlled' && <ControlledForm />}
      </Modal>
    </header>
  );
}
