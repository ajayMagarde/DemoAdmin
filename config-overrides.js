const webpack = require('webpack');
const WorkBoxPlugin = require('workbox-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = function override(config) {
    // Ensure fallback configurations are set
    config.resolve.fallback = {
        process: require.resolve('process/browser'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        util: require.resolve('util'),
        buffer: require.resolve('buffer')
    };

    // Adjust Workbox plugin configurations if needed
    config.plugins.forEach((plugin) => {
        if (plugin instanceof WorkBoxPlugin.InjectManifest) {
            plugin.config.maximumFileSizeToCacheInBytes = 50 * 1024 * 1024; // 50 MB
        }
    });

    // Add WebpackManifestPlugin to the plugins array
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
            Buffer: ['buffer', 'Buffer']
        }),
        new WebpackManifestPlugin({
            fileName: 'manifest.json', // Output file name for the manifest
        })
    ];

    return config;
};
