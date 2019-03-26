const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const prod = 'production';

module.exports = (env, argv) => ({
    entry: {
        preloader: './src/js/Components/Preloader/Preloader.js',
        main: './src/js/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: argv.mode === prod ? '[name].[chunkhash].js' : '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin('public', {
            dry: argv.mode !== prod,
        }),
        new MiniCssExtractPlugin({
            filename: argv.mode === prod ? 'style.[contenthash].css' : 'style.css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html',
        }),
    ],
    devtool: 'source-map',
    performance: { hints: false },
    watchOptions: {
        poll: true
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', 'scss'],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
});