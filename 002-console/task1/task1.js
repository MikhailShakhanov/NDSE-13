#!node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const calculateDate = require('./calculateDate.js');

const argv = yargs(hideBin(process.argv)).argv

function getDateParams() {
  if (argv.year || argv.y) {
    dateParams.year = nowDate.getFullYear();
    return;
  }
  if (argv.month || argv.m) {
    dateParams.month = nowDate.getMonth() + 1;
    return;
  }
  if (argv.date || argv.d) {
    dateParams.date = nowDate.getDate();
    return;
  }

}

const nowDate = new Date();
const dateParams = {};
getDateParams();

//если передали current
if (argv._.includes('current')) {
  if (Object.keys(dateParams).length) {
    for (let val in dateParams)
      console.log(dateParams[val]);
  } else {
    console.log(nowDate.toISOString());
  }
}

//если передали add или sub
if (argv._.includes('add') || argv._.includes('sub')) {
  const sign = argv._.includes('add') ? 1 : -1;
  calculateDate(sign, argv.year, argv.month, argv.day);
}


