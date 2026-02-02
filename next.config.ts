import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	serverExternalPackages: ["@napi-rs/canvas"],
	turbopack: {},
};

export default nextConfig;
