import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";
import path from "path";
const withMDX = createMDX();

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  turbopack: {
    root: path.dirname(__dirname),
  },
};

export default withMDX(config);
