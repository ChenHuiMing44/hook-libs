import * as path from 'path'

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  }
}
