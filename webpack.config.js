const path = require('path');
const HookShellScriptPlugin = require('hook-shell-script-webpack-plugin');
module.exports = {
  entry: './src/index.ts',
  mode:'development',
  optimization: { minimize: true },
  plugins: [
    new HookShellScriptPlugin({afterEmit:['node clearHtmlWhiteSpaces.js']})
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