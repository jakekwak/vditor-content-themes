/**
 * @fileoverview webpack.
 *
 * @author <a href="http://vanessa.b3log.org">Liyuan Li</a>
 * @version 0.2.0.1, Jan 4, 2020
 */

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const WebpackOnBuildPlugin = require('on-build-webpack')
// const CopyPlugin = require('copy-webpack-plugin')
// const BundleAnalyzerPlugin = require(
//   'webpack-bundle-analyzer').BundleAnalyzerPlugin
const pkg = require('./package.json')
const banner = new webpack.BannerPlugin({
  banner: `Vditor Content-Themes v${pkg.version} - Content-themes for Vditor
  
MIT License
`,
  entryOnly: true,
})

const rimraf = require('rimraf')

rimraf.sync('./dist', {},() => {
  console.log('rm dist')
})

module.exports = [
  {
    mode: 'production',
    entry: {
      'index': './src/assets/index/scss/index.scss',
      'zhning12': './src/assets/mdnice/zhning12/scss/index.scss',
    },
    resolve: {
      extensions: ['.scss'],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: [path.resolve(__dirname, 'src/assets')],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('autoprefixer')({grid: true, remove: false}),
                ],
              },
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    plugins: [
      banner,
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      // new WebpackOnBuildPlugin(() => {
      //   fs.unlinkSync('./dist/index.js')
      // }),
      // new CopyPlugin([
      //   {from: 'src/css', to: 'css'},
      // ]),
    ],
  }
]
