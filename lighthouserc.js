module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost/',
      ],
      staticDistDir: './dist',
    },
    upload: {
      target: 'lhci',
      // token: process.env.LHCI_SERVER_TOKEN,
    },
  },
};
