/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'developers.google.com',
                port: '',
            },
        ],
    }
};

export default nextConfig;
