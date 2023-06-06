import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalStateContext } from '../../context/ModalProvider.tsx';
import ModalBox from './ModalBox.tsx';

export interface ModalProps {
  onClose?: () => void;
  children?: React.ReactNode;
  hasCloseButton?: boolean;
  overlayClose?: boolean;
}

function ModalContainer() {
  const modalState = React.useContext(ModalStateContext);

  if (!modalState) {
    throw new Error('ModalStateContext not found');
  }

  const [isCSR, setIsCSR] = useState<boolean>(false);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  if (!isCSR) {
    return null;
  }

  const renderModal = modalState.map(({ props, children }) => {
    if (!props) {
      return null;
    }
    return <ModalBox {...props}>{children}</ModalBox>;
  });

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }

  return createPortal(renderModal, modalRoot);
}

export default ModalContainer;
