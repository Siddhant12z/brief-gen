/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.together.xyz'],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Add resolution for heatmap.js-fixed
    config.resolve.alias = {
      ...config.resolve.alias,
      'heatmap.js-fixed': require.resolve('heatmap.js-fixed/build/heatmap.min.js'),
    };

    return config;
  },
}

module.exports = nextConfig