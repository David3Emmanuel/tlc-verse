/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.SUPABASE_URL.split('//')[1],
            },
        ],
    },
};

export default nextConfig;
