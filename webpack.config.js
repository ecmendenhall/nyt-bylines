const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
      background: "./src/background.js",
      bylines: "./src/bylines.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  plugins: [
      new CopyWebpackPlugin([{
          from: './src/manifest.json',
      }])
  ]
};