/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dadosb2b.s3.us-west-2.amazonaws.com",
                port: "",
                pathname: "dev/imgHotel/*",
            },
        ],
    },
    //   async redirects() {
    //     return [
    //       {
    //         source: "/",
    //         destination: "/search",
    //         permanent: true,
    //       },
    //     ];
    //   },
};

module.exports = nextConfig;
