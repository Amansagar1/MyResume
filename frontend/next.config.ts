import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.29.225", "localhost"],
  output: "standalone",
};

export default nextConfig;
