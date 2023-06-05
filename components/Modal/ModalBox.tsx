import React, { forwardRef, useEffect } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  onClose?: () => void;
  children?: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal({ onClose, children }: ModalProps, ref) {
  const handleClose = () => {
    onClose?.();
  };

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
      <div className={styles['modal-wrap']} ref={ref}>
        <div className={styles.close}>
          <button type="button" onClick={handleClose}>
            <img src="/icons/close.png" alt="close" />
          </button>
        </div>
        {children || (
          <div>
            <h2>Title</h2>
            <p>Lorem ipsum dolor sit amet consectetur. Varius nunc aliquam nullam vitae.</p>
          </div>
        )}
      </div>
    </div>
  );
});

Modal.defaultProps = {
  onClose: undefined,
  children: undefined,
};

export default Modal;
