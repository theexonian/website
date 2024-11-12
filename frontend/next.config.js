/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '34.227.161.14',
				port: '1337',
				pathname: '/uploads/**',
			},
		],
	},
};

module.exports = nextConfig
