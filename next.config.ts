import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src")],
    additionalData: `@import "@/styles/variables";\n@import "@/styles/mixins";\n@import "@/styles/functions";`,
  },
};

export default nextConfig;
