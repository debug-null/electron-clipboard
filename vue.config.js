module.exports = {
  lintOnSave: true,
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
