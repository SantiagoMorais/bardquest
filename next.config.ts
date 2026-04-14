import type { NextConfig } from "next";
import path from "path";

const enableReactCompiler = process.env.NEXT_ENABLE_REACT_COMPILER === "true";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: enableReactCompiler,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    qualities: [40, 75],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src")],
    additionalData: `@import "@/styles/variables";\n@import "@/styles/mixins";\n@import "@/styles/functions";`,
  },
};

export default nextConfig;
