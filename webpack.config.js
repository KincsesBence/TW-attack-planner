const path = require('path');
const webpack = require('webpack');
const HookShellScriptPlugin = require('hook-shell-script-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const license = `
/*!
 * Custom Redistribution & Attribution License
 * Copyright (c) 2026 Bence Kincses aka. toldi26
 *
 * This software may be used, copied, modified, and redistributed
 * provided that attribution is preserved.
 *
 * You may NOT claim this software as your own original work.
 * 
 * Official repository: https://github.com/KincsesBence/TW-attack-planner
 * 
 */
`;

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: /Custom Redistribution|!/,
          },
        },
      }),
    ],
  },
  plugins: [
    new HookShellScriptPlugin({ afterEmit: ['node clearHtmlWhiteSpaces.js'] }),
    new webpack.DefinePlugin({
      SCRIPT_INFO: JSON.stringify({
        version: 'v2.0 - public',
        date: new Date().getTime(),
        dev: 'toldi26',
        git: 'https://github.com/KincsesBence/TW-attack-planner',
      }),
    }),
    new webpack.BannerPlugin({
      banner: license,
      raw: true,
      entryOnly: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "to-string-loader",
          },
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',

          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: false,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};