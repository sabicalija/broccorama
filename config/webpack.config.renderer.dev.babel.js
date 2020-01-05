import path from "path";
import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import merge from "webpack-merge";
import baseConfig from "./webpack.config.js";

const { NODE_ENV } = process.env;

export default merge.smart(baseConfig, {
  devtool: "source-map",
  mode: NODE_ENV,
  target: "electron-renderer",
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: 100
  },
  entry: path.join(__dirname, "../src/renderer/"),
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "./",
    filename: "renderer.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.styl(us)?$/,
        use: ["vue-style-loader", "css-loader", "stylus-loader"]
      }
    ]
  },
  optimization: {},
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV
    }),
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      showErrors: true,
      cache: true,
      title: "Brocc-o-rama",
      favicon: path.join(__dirname, "../public/favicon/logo.png"),
      template: path.join(__dirname, "../src/renderer/index.html")
    })
  ]
});
