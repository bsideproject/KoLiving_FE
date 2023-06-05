import React from 'react';
import ModalBox from '../components/Modal/ModalBox';

export default {
  title: 'Components/Modal',
  component: ModalBox,
};

const Template = (args) => {
  return <ModalBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  // placeholder: '기본 Input',
  // size: 'sm',
};
