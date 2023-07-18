import type { Meta, StoryObj } from '@storybook/react';

import Navbar from './Navbar';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Navbar',
  },
};