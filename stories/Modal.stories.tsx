import React from 'react';
import ModalBox from '../components/Modal/ModalBox';
import ModalProvider from '../context/ModalProvider';

export default {
  title: 'Components/ModalBox',
  component: ModalBox,
  argTypes: {
    overlayClose: { table: { disable: true } },
    custom: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
};

const Template = (args) => {
  return (
    <ModalProvider>
      <ModalBox {...args} />
    </ModalProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Test',
  content: '내용입니다',
};
export const WithCloseButton = Template.bind({});
WithCloseButton.args = {
  title: 'Test',
  content: '내용입니다',
  hasCloseButton: true,
};
export const WithTwoButtons = Template.bind({});
WithTwoButtons.args = {
  title: 'Test',
  content: '내용입니다',
  hasCloseButton: true,
  buttonType: 'both',
};
export const WithOutlineButton = Template.bind({});
WithOutlineButton.args = {
  title: 'Test',
  content: '내용입니다',
  hasCloseButton: true,
  buttonType: 'outline',
};
export const WithDefaultButton = Template.bind({});
WithDefaultButton.args = {
  title: 'Test',
  content: '내용입니다',
  hasCloseButton: true,
  buttonType: 'default',
};
