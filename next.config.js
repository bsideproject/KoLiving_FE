const path = require('path');
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  webpack5: true,
  webpack: (config) => {
    const modifiedConfig = { ...config };

    modifiedConfig.module.rules.push({
      test: /(\\|\/)(\.storybook|stories)(\\|\/)/,
      loader: 'ignore-loader',
    });
    modifiedConfig.resolve.fallback = {
      fs: false,
    };
    modifiedConfig.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return modifiedConfig;
  },
};

module.exports = {
  ...nextConfig,
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
