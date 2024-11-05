import type { NextConfig } from "next";
import prismaVercelConfig from "@hamampass/db/prisma/index.mjs";

const nextConfig: NextConfig = {
  /* config options here */

  ...prismaVercelConfig,
};

export default nextConfig;
