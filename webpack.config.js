const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/renderer/app.ts',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.renderer.json'
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'fabric': path.resolve(__dirname, 'node_modules/fabric/dist/index.min.mjs')
    }
  },
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, 'dist/renderer')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html'
    })
  ]
};