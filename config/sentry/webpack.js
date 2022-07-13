const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const { ENV } = require('../env');

const { NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN, NODE_ENV, UPLOAD_SOURCE_MAPS } = process.env;

const sentryConfig = {
    include: '.next',
    ignore: ['node_modules'],
    stripPrefix: ['webpack://_N_E/'],
    urlPrefix: '~/_next',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    deploy: {
        env: ENV,
    },
};

module.exports = (config, options, { sentryReleaseVersion }) => {
    if (!options.isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    config.plugins.push(
        new options.webpack.DefinePlugin({
            'process.env.NEXT_IS_SERVER': JSON.stringify(options.isServer.toString()),
        })
    );

    if (UPLOAD_SOURCE_MAPS === 'true' && SENTRY_DSN && NODE_ENV === 'production') {
        config.plugins.push(
            new SentryWebpackPlugin({ ...sentryConfig, release: sentryReleaseVersion })
        );
    }
};
