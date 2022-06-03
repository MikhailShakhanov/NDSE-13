const config = {
  WEATHERSTACK_TOKEN:
    process.env.WEATHERSTACK_TOKEN || '6ad53859517d0e096ef0a27358fa6468',
  WEATHERSTACK_URL: 'http://api.weatherstack.com/',
  CITY: 'Moscow',
};

module.exports = config;
