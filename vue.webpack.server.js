const webpack = require('webpack')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')
const base = require('./vue.webpack.base')
const merge = require('webpack-merge')

module.exports = merge(base, {
  entry: './src/entry-server.js',
  output: {
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  plugins: [
    new VueSSRServerPlugin(),
    new webpack.DefinePlugin({
      VUE_RUNTIME: JSON.stringify('server')
    })
  ],
  externals: [
    nodeExternals({
      // do not externalize CSS files in case we need to import it from a dep
      whitelist: /\.css$/
    })
  ]
})
