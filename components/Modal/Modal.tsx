import React, { useRef } from 'react';
import ModalContainer from './ModalContainer.tsx';
import ModalBox from './ModalBox.tsx';
import useOutSideClick from '../../hooks/useOutSideClick.ts';

interface ModalProps {
  onClose?: () => void;
}

function Modal({ onClose }: ModalProps) {
  const modalRef = useRef(null);

  useOutSideClick(modalRef, onClose);

  return (
    <ModalContainer>
      <ModalBox onClose={onClose} ref={modalRef} />
    </ModalContainer>
  );
}

Modal.defaultProps = {
  onClose: undefined,
};

export default Modal;
