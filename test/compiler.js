const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')

module.exports = function compiler(envFile) {
  const config = {
    context: __dirname,
    entry: envFile,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /.env$/,
          use: path.resolve(__dirname, '../src/main.js'),
        },
      ],
    },
  }
  const compiler = webpack(config)
  compiler.outputFileSystem = new MemoryFs()
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      else resolve(stats)
    })
  })
}
