const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 3000
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        UTILS: resolve('src/util'),
        COMPS: resolve('src/components'),
        TYPES: resolve('src/types'),
        HOOKS: resolve('src/hooks')
      }
    }
  }
}
