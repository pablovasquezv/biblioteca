const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: () => ({//Configuración para el debug
    devtool: 'source-map',
  }),
  transpileDependencies: true,
  devServer: {//Congiguración para el puerto
    port: 8081
  }
})
