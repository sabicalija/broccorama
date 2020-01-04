import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import baseConfig from "./webpack.config.js";

const { NODE_ENV } = process.env;

export default merge.smart(baseConfig, {
  devtool: "source-map",
  mode: NODE_ENV,
  target: "electron-main",
  entry: path.join(__dirname, "../src/main/"),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "main.js"
  },
  optimization: {},
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV,
      DEBUG_PROD: true,
      START_MINIMIZED: true
    }),
    new CopyPlugin([
      {
        from: path.join(__dirname, "../src/package.json"),
        to: path.join(__dirname, "../dist/package.json")
      },
      {
        from: path.join(__dirname, "../packages/latest-linux.yml"),
        to: path.join(__dirname, "../dist/dev-app-update.yml")
      }
    ])
  ],
  node: {
    __dirname: false,
    __filename: false
  }
});
