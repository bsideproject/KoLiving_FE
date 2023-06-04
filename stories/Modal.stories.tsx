import React from 'react';
import Modal from '../components/Modal/Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
};

const Template = (args) => {
  return <Modal {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  // placeholder: '기본 Input',
  // size: 'sm',
};
