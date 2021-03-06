const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    plugins: [
      new InjectManifest({
        swSrc: './src/service-worker-base.js',
        swDest: 'service-worker.js',
      }),
    ],
  },
};
