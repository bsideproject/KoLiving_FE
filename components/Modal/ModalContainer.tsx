import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalContainerProps {
  children: ReactNode;
}

function ModalContainer({ children }: ModalContainerProps) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  return createPortal(children, modalRoot);
}

export default ModalContainer;
