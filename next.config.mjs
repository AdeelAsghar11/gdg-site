/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    async rewrites() {
        return {
            beforeFiles: [
                { source: '/mtm', destination: '/mtm/index.html' },
                { source: '/mtm/handbook', destination: '/mtm/handbook/index.html' },
                { source: '/mtm/register', destination: '/mtm/register/index.html' },
                { source: '/events/mtm', destination: '/mtm/index.html' },
            ],
        };
    },
    async headers() {
        return [
            {
                source: '/mtm/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                ],
            },
            {
                source: '/mtm/:all*(svg|jpg|png|webp|avif|woff2|splinecode|css|js)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate',
                    },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'developers.google.com',
            },
            {
                protocol: 'https',
                hostname: 'fonts.gstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'www.gstatic.com',
            },
        ],
    },
};

export default nextConfig;
