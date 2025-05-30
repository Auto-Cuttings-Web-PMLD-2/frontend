import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "5000",
                pathname: "/static/segmented/**",
                search: "",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "5000",
                pathname: "/static/segmented/**",
                search: "",
            },
        ],
    },
};

export default nextConfig;
