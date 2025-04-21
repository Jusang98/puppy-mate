import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  // 다른 설정들도 여기 추가 가능
};

export default nextConfig;
