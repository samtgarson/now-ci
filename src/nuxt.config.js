module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Now CI',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', meta: 'description', content: 'An ephemeral CI tool for javascript apps' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: 'font-awesome/css/font-awesome.min.css' },
    { src: '~assets/base.sass', lang: 'sass' }
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios']
  }
}
