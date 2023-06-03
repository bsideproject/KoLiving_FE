const path = require('path');
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  webpack: (config) => {
    config.module.rules.push({
      test: /(\\|\/)(\.storybook|stories)(\\|\/)/,
      loader: 'ignore-loader',
    });
    return config;
  },
};

module.exports = {
  ...nextConfig,
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
