// webpack v4
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: { main: './src/js/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
      },
      {
        test: /\.(jpeg|jpg|png|svg|gif)$/,
        use: {
          loader: "url-loader"
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/css', 'dist/js', 'dist/index.html'], {} ),
    new ExtractTextPlugin({
        filename: devMode ? 'css/style.css' :  'css/style.[hash].css',
        disable: false,
        allChunks: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ]
};