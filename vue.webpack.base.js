const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/entry-client.js',
  target: 'web',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/vendor/',
        to: 'vendor'
      }
    ])
  ],
  externals: {
    jquery: 'jQuery'
  }
}
