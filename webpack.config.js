const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode:'development',
  optimization: { minimize: true },
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