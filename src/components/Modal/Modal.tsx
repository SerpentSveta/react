import './Modal.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import type { ModalProps } from '../../services/types';

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
                <button
                  type="button"
                  className="modal-close-button"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div>{children}</div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
}
