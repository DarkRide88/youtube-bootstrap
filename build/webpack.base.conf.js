const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};
module.exports = {
  externals: {
    path: PATHS,
  },
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
  },
  resolve: { extensions: ['.js', '.jsx'] },
  devtool: 'source-map',
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
      {
        test: /\.js%/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'postcss.config.js' } },
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],

      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/views/images`, to: `${PATHS.assets}images/` },
    ]),
  ],
};
