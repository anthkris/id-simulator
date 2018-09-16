const webpack = require('webpack');
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    bundle: ['./js/main.js']
  },
  resolve: {
    extensions: ['.js', '.html']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: prod ? true : false,
    port: 5002
  },
  mode,
  plugins: [
    new CopyWebpackPlugin([{
      from: 'js/serviceworker.js',
      to: './'
    }], {
      copyUnmodified: true,
    })
  ],
  devtool: prod ? false : 'source-map'
};