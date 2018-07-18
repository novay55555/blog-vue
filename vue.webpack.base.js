const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/entry-client.js',
  target: 'web',
  externals: [
    nodeExternals({
      whitelist: ['jquery']
    })
  ]
}
