const path = require('path');
const vueSrcPath = './src';

module.exports = {
  pluginOptions: {
    enableInSFC: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, vueSrcPath),
      },
      extensions: ['.js', '.vue', '.json']
    },
  },
}
