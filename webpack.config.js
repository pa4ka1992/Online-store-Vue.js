const devMode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
    mode: devMode,
    entry: {
        main: './src/main.ts',
    },
    devServer: {
        open: true,
        port: 8000,
        hot: false,
        client: {
            overlay: true,
            progress: true,
        },
        liveReload: true,
        watchFiles: ['src/*.html'],
    },
    output: {
        clean: devMode === 'production',
        path: path.resolve(__dirname, '/dist'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/i,
                loader: 'vue-loader',
            },
            {
                test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    esModule: false,
                },
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()],
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new ESLintPlugin({ extensions: 'ts' }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/public', 'index.html'),
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
        },
        plugins: [new TsConfigPathsPlugin({ extensions: ['.ts', '.tsx', '.vue'] })],
        extensions: ['.ts', '.js', '.vue', '.json'],
    },
};
