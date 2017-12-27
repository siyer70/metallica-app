const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');

const config = {
  entry: {
    main: [
      './src/index.js',
    ],
  },
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: path.resolve(__dirname, 'build'), // Path of output file
    filename: 'app.js', // Name of output file
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    // Transfer Files
    new TransferWebpackPlugin([
      {from: 'public'},
    ], path.resolve(__dirname), './'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          combineLoaders([{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ])
        )
      }
    ],
  },
};

module.exports = config;
