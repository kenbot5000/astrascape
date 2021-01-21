module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'Astrascape',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    icons: [
      {
        src: '@/assets/icon.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ]
  }
}