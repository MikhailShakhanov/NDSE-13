#!node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const config = require('./config');

const argv = yargs(hideBin(process.argv)).argv;

const http = require('http');

const weatherStackToken = config.WEATHERSTACK_TOKEN;
const weatherStackUrl = config.WEATHERSTACK_URL;
const city = argv._[0] || config.CITY;

const url = `${weatherStackUrl}/current?access_key=${weatherStackToken}&query=${city}`;

http
  .get(url, (res) => {
    const { statusCode } = res;
    if (statusCode !== 200) {
      console.log(`statusCode: ${statusCode}`);
      return;
    }

    res.setEncoding('utf8');
    let rowData = '';
    res.on('data', (chunk) => (rowData += chunk));
    res.on('end', () => {
      const parseData = JSON.parse(rowData);
      console.log(`Прогноз для ${city}`);
      console.log(parseData);
    });
  })
  .on('error', (err) => {
    console.error(err);
  });
