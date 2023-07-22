const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",
  devServer: {
    proxy: "http://localhost:8080/fitness/api/login/"
  }
})


