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
            {
                protocol: "http",
                hostname: "server.theexonian.net",
                port: "1337",
                pathname: "/uploads/**",
            },
            {
                protocol: "https",
                hostname: "d2stzhv1hip58f.cloudfront.net",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.clerk.dev",
                pathname: "/**",
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