const { i18n } = require('./next-i18next.config');

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	output: 'standalone',
};

module.exports = {
	...nextConfig,
	i18n,
};
