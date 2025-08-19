import './Modal.css';

import React from 'react';
import ReactDOM from 'react-dom';
import type { ModalProps } from '../../services/types';

export function Modal({ isShowing, hide, children }: ModalProps) {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div className="modal-wrapper" aria-modal tabIndex={-1} role="dialog">
            <div className="modal">
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
