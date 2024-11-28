/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "34.227.161.14",
				port: "1337",
				pathname: "/uploads/**",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/portal",
				destination: "http://34.227.161.14:1337/",
			},
		];
	},
};

module.exports = nextConfig;
