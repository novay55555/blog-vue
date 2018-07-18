const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const base = require('./vue.webpack.base')
const merge = require('webpack-merge')

module.exports = merge(base, {
  plugins: [new VueSSRClientPlugin()]
})
