import React from 'react';
import Button from '../components/Button/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { table: { disable: true } },
  },
};

const Template = (args) => {
  const handleClick = () => {
    console.log('test');
  };

  return (
    <Button onClick={handleClick} {...args}>
      test
    </Button>
  );
};

export const Small = Template.bind({});
Small.args = {
  type: 'button',
  size: 'sm',
  color: 'r1'
};
export const Medium = Template.bind({});
Medium.args = {
  type: 'button',
  size: 'md',
  color: 'r1'
};
export const Large = Template.bind({});
Large.args = {
  type: 'button',
  size: 'lg',
  color: 'r1'
};
export const Disabled = Template.bind({});
Disabled.args = {
  type: 'button',
  disabled: true,
};
