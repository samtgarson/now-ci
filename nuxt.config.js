module.exports = {
  srcDir: 'client/',
  head: {
    title: 'Now CI',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An ephemeral CI tool for javascript apps' }
    ]
  },
  css: [
    { src: 'font-awesome/css/font-awesome.min.css' },
    { src: '~assets/base.sass', lang: 'sass' }
  ],
  build: {
    vendor: ['axios']
  }
}
