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
    }
};

module.exports = nextConfig;