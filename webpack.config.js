const path = require('path')

function fromSharedConfig(moduleName) {
  return {
    name: moduleName,
    entry: `./src/${moduleName}/index.ts`,
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist', moduleName)
    }
  }
}

module.exports = [
  fromSharedConfig('background'),
  fromSharedConfig('foreground'),
  fromSharedConfig('popup')
]
