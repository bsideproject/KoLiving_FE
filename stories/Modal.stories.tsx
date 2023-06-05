import React from 'react';
import ModalBox from '../components/Modal/ModalBox';
import ModalProvider from '../context/ModalProvider';

export default {
  title: 'Components/ModalBox',
  component: ModalBox,
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
  // placeholder: '기본 Input',
  // size: 'sm',
};
