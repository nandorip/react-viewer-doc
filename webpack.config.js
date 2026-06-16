const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
  const useDist = Boolean(env.dist);

  return {
    entry: path.join(__dirname, 'example/index.js'),
    output: {
      path: path.join(__dirname, 'example/dist'),
      filename: 'bundle.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'example/index.html'),
        filename: './index.html',
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        'react-document-viewer': path.resolve(
          __dirname,
          useDist ? 'dist' : 'src',
        ),
      },
    },
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'example/public'),
          publicPath: '/',
        },
        {
          directory: path.join(__dirname, 'example'),
        },
      ],
      port: 3001,
      host: '0.0.0.0',
      allowedHosts: 'all',
      client: {
        webSocketURL: 'ws://localhost:3001/ws',
      },
    },
  };
};