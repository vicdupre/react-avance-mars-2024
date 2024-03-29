/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fakestoreapi.com",
        protocol: "https",
        pathname: "/img/*",
      },
    ],
  },
};

export default nextConfig;
