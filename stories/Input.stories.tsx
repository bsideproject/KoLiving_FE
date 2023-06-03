import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Input from '../components/Input/Input.tsx';

const meta: Meta<typeof Input> = {
  title: 'List',
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const ManyItems: Story = {
  render: (args) => <Input {...args} />,
};
