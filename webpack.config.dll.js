/**
 * dll包，加快生产环境打包构建速度
 */

const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'element-plus',
      'vue-router',
      'vuex',
      'vue',
      'axios',
      'dayjs',
    ],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: resolve(__dirname, 'dll/manifest.json')
    })
  ],
}
