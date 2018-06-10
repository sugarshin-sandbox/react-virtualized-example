const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const Stylish = require('webpack-stylish')

module.exports = {
  mode: 'development',
  cache: true,
  entry: {
    app: ['@babel/polyfill', './src/index.js'],
  },
  plugins: [
    new Stylish(),
    new HtmlPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules', 'src'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, camelCase: 'dashesOnly' } },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './build',
    hot: true,
    publicPath: '/',
    host: '0.0.0.0',
    port: 8003,
  },
}
