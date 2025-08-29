import './Modal.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import type { ModalProps } from '../../services/types';
import { Button } from '../Button/Button';

export function Modal({ isShowing, hide, children, modalRef }: ModalProps) {
  useEffect(() => {
    const closeOnEscapeKey = (event: KeyboardEvent) =>
      event.key === 'Escape' ? hide() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [hide]);

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div className="modal-wrapper" aria-modal tabIndex={-1} role="dialog">
            <div className="modal" ref={modalRef}>
              <div className="modal-header">
                <Button className="modal-close-button" onClick={hide}>
                  <span aria-hidden="true">&times;</span>
                </Button>
              </div>
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
}
