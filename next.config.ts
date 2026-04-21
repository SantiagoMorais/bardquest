import type { NextConfig } from "next";
import path from "path";

const enableReactCompiler = process.env.NEXT_ENABLE_REACT_COMPILER === "true";

const nextConfig: NextConfig = {
  reactCompiler: enableReactCompiler,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    qualities: [40, 50, 60, 75],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src")],
  },
};

export default nextConfig;
