const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-data/' // Thay tên repository của các bạn vào đây nhé
    : '/',
  transpileDependencies: true
})
