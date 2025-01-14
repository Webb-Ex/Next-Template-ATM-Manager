import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/", 
        destination: "/ATMManager/ATM", 
        permanent: true, 
      },
    ];
  },
};

export default nextConfig;
