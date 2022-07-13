module.exports = config => {
    const isProd = process.env.NODE_ENV === 'production';

    config.resolve.alias = {
        ...config.resolve.alias,
        rosetta: isProd ? 'rosetta' : 'rosetta/debug',
    };
};
