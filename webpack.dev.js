const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require("webpack-merge");

const port = process.env.PORT || 3000;

module.exports = merge(common, {
    mode: 'development',
    performance: {
        hints: false,
    },
    optimization: {
        minimize: false,
    },
    devServer: {
        allowedHosts: 'all',
        historyApiFallback: true,
        compress: true,
        hot: true,
        static: path.resolve(__dirname, 'src'),
        port: port,
    },
});