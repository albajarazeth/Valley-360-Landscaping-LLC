import type { NextConfig } from "next";

const repositoryName = "Valley-360-Landscaping-LLC";
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubPages ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
