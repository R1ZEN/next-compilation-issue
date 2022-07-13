const withPlugins = require('next-compose-plugins');
const getBundleAnalyzer = require('@next/bundle-analyzer');
const { withSentryConfig } = require('@sentry/nextjs');

const { ENV, BASE_PATH, API_HOST } = require('./config/env');
const i18n = require('./config/i18n');
const i18nWebpack = require('./config/i18n/webpack');
const sentryWebpack = require('./config/sentry/webpack');
const { deviceSizes } = require('./config/devices');
const { version } = require('./package.json');
const commitHash = require('./lib/utils/helpers/git-hash');

const { NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN, UPLOAD_SOURCE_MAPS } = process.env;

const sentryReleaseVersion = ENV === 'production' ? version : commitHash();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    sentryReleaseVersion,
  },
  productionBrowserSourceMaps: UPLOAD_SOURCE_MAPS === 'true',
  basePath: BASE_PATH,
  i18n,
  // swcMinify: true,
  webpack: (config, options) => {
    const { defaultLoaders } = options;

    config.module.rules.push({
      test: /\.gql$/,
      exclude: /node_modules/,
      use: [defaultLoaders.babel, { loader: 'webpack-graphql-loader' }],
    });

    i18nWebpack(config, options);
    sentryWebpack(config, options, { sentryReleaseVersion });

    return config;
  },
  images: {
    deviceSizes,
  },
};

// local
if (ENV === 'development') {
  nextConfig.rewrites = async () => ({
    beforeFiles: [
      {
        source: '/logout',
        destination: `${API_HOST}/api/auth/logout`,
      },
      {
        source: '/social-network-auth',
        destination: `${API_HOST}/api/auth/social`,
      },
    ],
  });
}

const withBundleAnalyzer = getBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config = withPlugins([withBundleAnalyzer], nextConfig);

// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#extend-nextjs-configuration
const exportConfig = SENTRY_DSN
    ? withSentryConfig(config, {
      silent: ENV === 'development',
    })
    : config;

module.exports = exportConfig;
