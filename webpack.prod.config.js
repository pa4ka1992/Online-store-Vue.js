const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          // We have to disable this because of vue-loader issues
          // See https://github.com/vuejs/vue-loader/issues/1915
          ignoreDiagnostics: [7006, 2322],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
      chunkFilename: 'styles.[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: 'node_modules',
        parallel: true,
        minify: TerserWebpackPlugin.swcMinify,
        extractComments: false,
        terserOptions: {
          compress: { drop_console: true, drop_debugger: true },
        },
      }),
    ],
    // splitChunks: {
    //   chunks: 'all',
    // },
  },
};