const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/index.tsx",

  resolve: {
    extensions: [".ts", ".tsx", '.js']
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
          test: /\.tsx?$/,
          loader: 'ts-loader'
      }
    ]
  },
  devServer: {
    contentBase: './public',
    compress: true,
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
 
  plugins: [
    new HtmlWebpackPlugin({
      template: `./public/index.html`
    })
  ]
};