const path = require("path");

module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  },
  title: "Reusable React Sidebar",
  styleguideDir: "dist-docs",
  moduleAliases: {
    "stylish-sidebar": path.resolve(__dirname, "src")
  }
};