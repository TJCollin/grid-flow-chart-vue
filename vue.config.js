/*
 * @Author: collin
 * @Date: 2021-01-30 21:07:59
 * @Gitee: https://gitee.com/CollinZhang
 * @LastEditors: collin
 * @LastEditTime: 2021-01-31 17:02:35
 */
"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  css: { extract: false },
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        }),
      ],
    },
  },
};
