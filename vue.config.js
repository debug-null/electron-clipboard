module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['iohook']
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/variable.scss";`
      }
    }
  }
};
