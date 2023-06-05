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

  if (!modalState.props) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }

  return createPortal(<ModalBox {...modalState.props}>{modalState.children}</ModalBox>, modalRoot);
}

export default ModalContainer;
