const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'js/bundle.[hash].js',
    path: path.resolve(__dirname, 'public')
  },
  module : {
    loaders : [
      {
          test    : /\.jsx?$/,
          exclude : /node_modules/,
          loader  : 'babel-loader'
      },
      {
          test    : /\.scss?/,
          loader  : 'style-loader!css-loader!sass-loader'
      }
    ],
    rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['react', ["es2015", { "modules": false }]],
            plugins: ['transform-function-bind']
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpg)(\?.*$|$)/,
          use: 'url-loader?limit=100000'
        }

      ],

  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.json','.jpg','.jpeg'],
    alias: {
      styles: path.resolve(__dirname, 'app', 'styles'),
      images: path.resolve(__dirname, 'app', 'images')
    }
    },

  plugins: [
    HtmlWebpackPluginConfig

  ],
    devtool: 'source-map'


};
