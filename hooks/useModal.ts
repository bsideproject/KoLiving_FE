import { useContext } from 'react';
import { ModalSetterContext, StateProps } from '../context/ModalProvider.tsx';

function useModal() {
  const setModalState = useContext(ModalSetterContext);

  if (!setModalState) {
    throw new Error('ModalSetterContext is not properly initialized');
  }

  const openModal = ({ type, props = null, children = null }: StateProps) => {
    if (setModalState) {
      setModalState.setState({ type, props, children });
    }
  };

  const closeModal = () => {
    if (setModalState) {
      setModalState.setState({ type: null, props: null, children: null });
    }
  };

  return { openModal, closeModal };
}

export default useModal;
