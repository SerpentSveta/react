import { useState } from 'react';

import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { UncontrolledForm } from '../UncontrolledForm/UncontrolledForm';
import { ControlledForm } from '../ControlledForm/ControlledForm';
import { useModal } from '../../hooks/useModal';

export function Header() {
  const { isShowing, toggle } = useModal();
  const [activeForm, setActiveForm] = useState<
    'uncontrolled' | 'controlled' | null
  >(null);

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
      <Modal isShowing={isShowing} hide={toggle}>
        {activeForm === 'uncontrolled' && <UncontrolledForm />}
        {activeForm === 'controlled' && <ControlledForm />}
      </Modal>
    </header>
  );
}
