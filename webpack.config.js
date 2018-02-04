const path = require('path')

module.exports = [
  {
    name: 'background',
    entry: './src/background/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist', 'background')
    }
  },
  {
    name: 'foreground',
    entry: './src/foreground/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist', 'foreground')
    }
  },
  {
    name: 'popup',
    entry: './src/popup/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist', 'popup')
    }
  }
]
