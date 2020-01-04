import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import baseConfig from "./webpack.config.js";

export default merge.smart(baseConfig, {
  devtool: "source-map",
  mode: "production",
  target: "electron-main",
  entry: path.join(__dirname, "../src/main/"),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "main.js"
  },
  optimization: {
    minimizer: process.env.E2E_BUILD
      ? []
      : [
          new TerserPlugin({
            parallel: true,
            sourceMap: true,
            cache: true
          })
        ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode:
        process.env.OPEN_ANALYZER === "true" ? "server" : "disabled",
      openAnalyzer: process.env.OPEN_ANALYZER === "true"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      DEBUG_PROD: false,
      START_MINIMIZED: false
    }),
    new CopyPlugin([
      {
        from: path.join(__dirname, "../src/package.json"),
        to: path.join(__dirname, "../dist/package.json")
      }
    ])
  ],
  node: {
    __dirname: false,
    __filename: false
  }
});
