import React, { useRef } from 'react';
import ModalContainer from './ModalContainer.tsx';
import ModalBox from './ModalBox.tsx';
import useOutSideClick from '../../hooks/useOutSideClick.ts';

interface ModalProps {
  onClose?: () => void;
  children?: React.ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
  const modalRef = useRef(null);

  useOutSideClick(modalRef, onClose);

  return (
    <ModalContainer>
      <ModalBox onClose={onClose} ref={modalRef}>
        {children}
      </ModalBox>
    </ModalContainer>
  );
}

Modal.defaultProps = {
  onClose: undefined,
  children: undefined,
};

export default Modal;
