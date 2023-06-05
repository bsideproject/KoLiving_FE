import React, { forwardRef, useEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import { ModalProps } from './ModalContainer.tsx';
import useModal from '../../hooks/useModal.ts';
import useOutSideClick from '../../hooks/useOutSideClick.ts';

function Modal({ children, hasCloseButton, overlayClose }: ModalProps) {
  const { closeModal } = useModal();

  const modalRef = useRef(null);

  const handleClose = () => {
    closeModal();
  };

  useOutSideClick(modalRef, closeModal);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body === null) {
      return undefined;
    }
    const { overflow } = body.style;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = overflow;
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles['modal-wrap']} ref={overlayClose ? modalRef : undefined}>
        {hasCloseButton && (
          <div className={styles.close}>
            <button type="button" onClick={handleClose}>
              <img src="/icons/close.png" alt="close" />
            </button>
          </div>
        )}
        {children || (
          <div>
            <h2>Title</h2>
            <p>Lorem ipsum dolor sit amet consectetur. Varius nunc aliquam nullam vitae.</p>
          </div>
        )}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  onClose: undefined,
  children: undefined,
};

export default Modal;
