import React, { useEffect, useRef } from 'react';
import Close from '@/public/icons/close.svg';
import Check2 from '@/public/icons/Check2.svg';
import styles from './Modal.module.scss';
import { ModalProps } from './ModalContainer.tsx';
import useModal from '../../hooks/useModal.ts';
import useOutSideClick from '../../hooks/useOutSideClick.ts';
import Button from '../Button/Button.tsx';
import Header from '../Header/Header.tsx';

function Modal({
  children,
  hasCloseButton,
  disabledBtn = false,
  overlayClose,
  title = '',
  content = '',
  custom = false,
  customHeader = false,
  buttonType = 'none',
  handleClose,
  handleSecondButton,
  handleCustomEvent,
  customButtonName,
  buttonName = '',
  buttonName2 = '',
  buttonNames = [],
  hasButton = true,
  size = 'md',
}: ModalProps) {
  const { closeModal } = useModal();
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(-1);
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

  const handleButtonClick = (index: number) => {
    setSelectedButtonIndex(index);
  };

  const renderButton = () => {
    switch (buttonType) {
      case 'none':
        return null;
      case 'both':
        return (
          <>
            <Button onClick={() => handleClose?.()} color="outlined" size="md">
              {buttonName}
            </Button>
            <Button onClick={() => handleSecondButton?.()} color="r1" size="md">
              {buttonName2}
            </Button>
          </>
        );
      case 'outline':
        return (
          <Button onClick={() => handleClose?.()} color="noBg" size="lg">
            {buttonName}
          </Button>
        );
      case 'default':
        return (
          <Button onClick={() => handleClose?.()} color="r1" size="lg" disabled={disabledBtn}>
            {buttonName}
          </Button>
        );
      case 'wrapper':
        return buttonNames.map((_buttonName, index) => {
          const isSelected = index === selectedButtonIndex;
          return (
            <Button onClick={() => handleButtonClick(index)} color={isSelected ? 'noBg' : 'outlined'} size="lg">
              <div className={`flex items-center justify-between `}>
                <span>{_buttonName}</span>
                {isSelected && <Check2 className="ml-auto" />}
              </div>
            </Button>
          );
        });
      default:
        return null;
    }
  };

  const goBack = () => {
    closeModal();
  };
  const defaultHeader = () => {
    let result = <Header type="title" title={title} right="close" logoColor="black" handleButtonClick={goBack} />;
    // TODO 나중에 여기 layoutHeader쪽 Component를 받는 거로 변경
    if (customHeader) {
      result = <Header type="back" logoColor="black" bgColor="white" title={title} handleButtonClick={goBack} />;
    }
    return result;
  };

  return size === 'md' ? (
    <div className={styles.overlay}>
      <div className={styles['modal-wrap']} ref={overlayClose ? modalRef : undefined}>
        {hasCloseButton && (
          <div className={styles.close}>
            <button type="button" onClick={onClose}>
              <Close width={24} height={24} className="stroke-r1 stroke-[2]" />
            </button>
          </div>
        )}
        {custom ? (
          children
        ) : (
          <div>
            <h2>{title}</h2>
            <p
              className={`${buttonType === 'wrapper' && 'text-r1'} mt-[4px]`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}
        {hasButton && (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {buttonType && buttonType !== 'none' && buttonType !== 'wrapper' ? (
              <div className="mt-[20px] flex gap-x-2 items-center justify-center">{renderButton()}</div>
            ) : (
              <div className="mt-[10] flex flex-col items-center justify-center space-y-[10px]">
                {renderButton()}
                <Button onClick={handleCustomEvent} color="r1" size="lg" _className="mt-[20px] font-semibold">
                  {customButtonName}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  ) : (
    <div className={styles.full}>
      {defaultHeader()}
      <div className="mt-[62px] px-[20px] text-g6 text-[16px] font-light w-full max-w-[440px] min-w-[320px]">
        {custom ? children : content}
      </div>
    </div>
  );
}

export default Modal;
