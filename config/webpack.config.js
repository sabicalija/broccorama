import path from "path";
import webpack from "webpack";
import { dependencies as externals } from "../src/package.json";

export default {
  externals: [...Object.keys(externals || {})],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, "..", "dist"),
    libraryTarget: "commonjs2"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      routes: path.resolve(__dirname, "../src/renderer/views/")
    },
    extensions: [".js", ".jsx", ".json"],
    modules: [path.join(__dirname, "../src"), "node_modules"]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production"
    }),
    new webpack.NamedModulesPlugin()
  ]
};
