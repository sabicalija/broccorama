import { join } from "path";
import { exists, readFile, writeFile } from "fs";
import webpack from "webpack";
import merge from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import baseConfig from "./webpack.config.js";

const { NODE_ENV } = process.env;

/* Create `dev-app-update.yml` for debugging */
createAppUpdateFiles();

export default merge.smart(baseConfig, {
  devtool: "source-map",
  mode: NODE_ENV,
  target: "electron-main",
  entry: join(__dirname, "../src/main/"),
  output: {
    path: join(__dirname, "../dist"),
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
        from: join(__dirname, "../src/package.json"),
        to: join(__dirname, "../dist/package.json")
      }
    ])
  ],
  node: {
    __dirname: false,
    __filename: false
  }
});

const createAppUpdateFiles = () => {
  const source = join(__dirname, "../packages/latest-linux.yml");
  const target = join(__dirname, "../dist/dev-app-update.yml");
  exists(source, exists => {
    if (exists) {
      readFile(source, (err, data) => {
        const content =
          "provider: github\n" +
          "owner: sabicalija\n" +
          "repo: broccorama\n" +
          data.toString();
        writeFile(target, content, () => null);
      });
    }
  });
};
