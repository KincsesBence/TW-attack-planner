const path = require('path');
const webpack = require('webpack');
const HookShellScriptPlugin = require('hook-shell-script-webpack-plugin');
module.exports = {
  entry: './src/index.ts',
  mode:'development',
  optimization: { minimize: true },
  plugins: [
    new HookShellScriptPlugin({afterEmit:['node clearHtmlWhiteSpaces.js']}),
    new webpack.DefinePlugin({
      SCRIPT_INFO: JSON.stringify({
        version:'v0.1.6-beta',
        date:new Date().getTime(),
        dev:'toldi26',
        git:'https://github.com/KincsesBence/TW-attack-planner',
      }),
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
  devtool:false,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};