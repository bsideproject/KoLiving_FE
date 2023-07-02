import React, { useEffect, useState } from 'react';
import { ModalStateContext } from '../../context/ModalProvider.tsx';

export interface ModalProps {
  onClose?: () => void;
  children?: React.ReactNode;
  hasCloseButton?: boolean;
  overlayClose?: boolean;
  title?: string;
  content?: string;
  custom?: boolean;
  buttonType?: 'none' | 'both' | 'outline' | 'default';
  handleClose?: () => void;
  buttonName?: string;
}

function ModalContainer() {

export default ModalContainer;
