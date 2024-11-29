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
	env: {
		MEILISEARCH_URL: process.env.MEILISEARCH_URL,
		MEILISEARCH_PK: process.env.MEILISEARCH_PK,
		STRAPI_API: process.env.STRAPI_API,
		SPEECHIFY_API_KEY: process.env.SPEECHIFY_API_KEY,
	},
};

module.exports = nextConfig;
