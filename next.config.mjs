/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
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
