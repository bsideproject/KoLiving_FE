import React from 'react';
import ModalContainer from './ModalContainer.tsx';
import ModalBox from './ModalBox.tsx';

interface ModalProps {
  onClose?: () => void;
}

function Modal({ onClose }: ModalProps) {
  return (
    <ModalContainer>
      <ModalBox onClose={onClose} />
    </ModalContainer>
  );
}

Modal.defaultProps = {
  onClose: undefined,
};

export default Modal;
