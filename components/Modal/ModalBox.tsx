import React, { useEffect, useRef } from 'react';
import Close from '@/public/icons/close.svg';
import styles from './Modal.module.scss';
import { ModalProps } from './ModalContainer.tsx';
import useModal from '../../hooks/useModal.ts';
import useOutSideClick from '../../hooks/useOutSideClick.ts';
import Button from '../Button/Button.tsx';
import Header from '../Header/Header.tsx';
import DefaultLayout from '../layouts/DefaultLayout.tsx';

function Modal({
  children,
  hasCloseButton,
  overlayClose,
  title = '',
  content = '',
  custom = false,
  buttonType = 'none',
  handleClose,
  buttonName = '',
  size = 'md',
}: ModalProps) {
  const { closeModal } = useModal();

  const modalRef = useRef(null);

  const onClose = () => {
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

  const renderButton = () => {
    switch (buttonType) {
      case 'none':
        return null;
      case 'both':
        return (
          <>
            <Button onClick={() => handleClose?.()} disabled size="lg">
              test
            </Button>
            <Button onClick={() => handleClose?.()} color="r1" size="lg">
              test
            </Button>
          </>
        );
      case 'outline':
        return (
          <Button onClick={() => handleClose?.()} color="noBg" size="lg">
            test
          </Button>
        );
      case 'default':
        return (
          <Button onClick={() => handleClose?.()} color="r1" size="lg">
            {buttonName}
          </Button>
        );
      default:
        return null;
    }
  };

  const goBack = () => {
    closeModal();
  };

  return size === 'md' ? (
    <div className={styles.overlay}>
      <div className={styles['modal-wrap']} ref={overlayClose ? modalRef : undefined}>
        {hasCloseButton && (
          <div className={styles.close}>
            <button type="button" onClick={onClose}>
              <Close />
            </button>
          </div>
        )}
        {custom ? (
          children
        ) : (
          <div>
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
        )}
        {buttonType && buttonType !== 'none' && <div className="mt-[20px] flex gap-x-2">{renderButton()}</div>}
      </div>
    </div>
  ) : (
    <div className={styles.full}>
      <Header type="title" title={title} right="close" logoColor="black" handleButtonClick={goBack} />
      <div className="mt-[62px] px-[20px] text-g6 text-[16px] font-light">{content}</div>
    </div>
  );
}

export default Modal;
