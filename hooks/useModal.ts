import { useContext } from 'react';
import { ModalSetterContext, StateProps } from '../context/ModalProvider.tsx';

function useModal() {
  const setModalState = useContext(ModalSetterContext);

  if (!setModalState) {
    throw new Error('ModalSetterContext is not properly initialized');
  }

  const openModal = ({ props = null, children = null }: StateProps) => {
    if (setModalState) {
      setModalState.setState((modals) => [...modals, { props, children }]);
    }
  };

  const closeModal = () => {
    if (setModalState) {
      setModalState.setState((modals) => modals.filter((_, index) => index !== modals.length - 1));
    }
  };

  return { openModal, closeModal };
}

export default useModal;
