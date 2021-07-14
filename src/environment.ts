export const environment = {
  production: false,
  title: 'GifMN',

  app: {
    endpoint: 'http://127.0.0.1:1337',
    language: {
      default: 'tr',
      fallback: 'tr'
    },

    imageEndpoint: 'http://127.0.0.1:8080'
  },

  tags: {
    colors: [
      '#405de6', '#5851db', '#833ab4', '#c13584', '#e1306c', '#fd1d1d',
      '#1D89F4', '#d33131'
    ]
  }
};
