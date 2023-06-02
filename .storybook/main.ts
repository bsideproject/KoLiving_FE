import type { StorybookConfig } from '@storybook/nextjs';
const path = require('path');

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.js'),
    },
  },
  babel: async (options) => ({
    ...options,
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
        'preset-react-jsx-transform', // Can name this anything, just an arbitrary alias to avoid duplicate presets'
      ],
    ],
  }),
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    return config;
  },
};
export default config;
