const config = {
  UPLOAD_PATH: 'upload/books',
  ROOT_URL: 'api',
  mongodb: {
    uri: (process.env.NODE_ENV === 'PROD' ?
      'mongodb://localhost/library' :
      'mongodb://localhost/011-mongo'),
  },
};

module.exports = config;
