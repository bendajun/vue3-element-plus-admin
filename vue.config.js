/* eslint-disable indent */

const webpack = require('webpack')
const { resolve } = require('path')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin')

module.exports = {
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  configureWebpack: {
    devServer: {
      port: 8888, // 配置端口号
      open: true, // 默认打开
      proxy: {
        [process.env.VUE_APP_BASE_API]: {
          target: process.env.VUE_PROXY_TARGET,
          changeOrigin: true,
          pathRewrite: {
            [`^${process.env.VUE_APP_BASE_API}`]: '',
          },
        },
      },
    },
    plugins: [
      new StyleLintWebpackPlugin({
        files: ['**/*.{js,jsx,ts,tsx,html,vue,css,scss}'],
        fix: false, // 是否自动修复,不建议
        cache: true, // 是否缓存
        emitErrors: false, // 不发出，但是必须修复
        failOnError: false, // 不发出，但是必须修复
      }),
    ],
  },
  chainWebpack(config) {
    const {
      NODE_ENV
    } = process.env || {}
    config.module
    .rule('svg')
      .exclude.add(resolve(__dirname, 'src/icons'))
      .end()
    config.module
      .rule('icons')
        .test(/\.svg$/)
        .include
          .add(resolve(__dirname, 'src/icons'))
          .end()
        .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })
          .end()
        .use('svgo-loader')
          .loader('svgo-loader')
          /* .options({
            externalConfig: 'svgo.yml'
          }); */
    config
    .when(NODE_ENV === 'production', config => {
      config
        .plugin('dll')
        .use(webpack.DllReferencePlugin, [{
          manifest: resolve(__dirname, 'dll/manifest.json')
        }])
        .end()
        .plugin('addAssetHtml')
        .after('html')
        .use(AddAssetHtmlWebpackPlugin, [{
          filepath: resolve(__dirname, 'dll/vendor.js'),
          outputPath: './js',
          hash: true,
          publicPath: './js',
        }])
        .end()
        .optimization
          .runtimeChunk('single')
          .splitChunks({
            chunks: 'all', // 抽取公共模块的来源，all(全部模块入口和动态的)
            cacheGroups: {
              commons: {
                name: 'chunk-commons',
                test: resolve(__dirname, 'src/components'),
                minChunks: 3,
                priority: 5,
                reuseExistingChunk: true,
              },
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial', // 只有第三方包在入口引入依赖了的
              },
              icons: {
                name: 'chunk-icons',
                test: resolve(__dirname, 'src/icons'),
                priority: 20,
              },
            }
          })
          .end()
    })
  }
}

/**
 * 浏览器第一次访问一个地址时会缓存静态文件(html,css,js)，然后当第二次访问时会查看缓存是否过期，如果没有过期不会重新下载网页，
 * 直接使用缓存中的网页。只有网站明确标明已经更新了，浏览器才会重新下载网页。
 *
 * 利用浏览器的缓存机制，达到一个缓存优化，除非第三方库的版本变化，会重新生成一个新的文件，这样浏览器也会重新请求新的文件。
 * cacheGroups即缓存组，其中的每一项缓存组都可以继承/覆盖之前提到的splitChunks参数值（如name、maxSize、minSize、maxInitialRequests、maxAsyncRequests等），
 * 除此之外还额外提供了三个配置，分别为：test, priority 和 reuseExistingChunk。

priority ：优先级，default：0；如果两个缓存组都需要将某一公共模块打包，为了不重复打包，肯定只能打包进入其中之一，那么优先考虑priority 高的。
reuseExistingChunk：是否重用已经存在的模块，default：true；例：如果在当前缓存组需要抽离出 jquery.js，但是 jquery.js已经被其它缓存组抽取出来了，那么将会重用已经抽取出来的 jquery.js。
test：function (module, chunks) | RegExp | string 在chunks的基础上，精确的选择那些公共模块应该被打包。

 */
