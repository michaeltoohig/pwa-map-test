module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.map$/,
        /manifest\.json$/,
      ],
    },
    themeColor: '#42b983',
    msTileColor: '#42b983',
    appleMobileWebAppCache: 'yes',
  },
};
