#!node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

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

//последний день месяца
function getMonthLastDay(date) {
  return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
}

//високосный
function isLeapYear(date) {
  return date.getFullYear() % 4 === 0;
}

//вычисление даты
function calculateDate(sign = 1, y = 0, m = 0, d = 0) {

  const date = new Date();
  const newDate = new Date();

  newDate.setDate(1);
  const monthsToCalc = y ? 12 * y + m : m;

  newDate.setMonth(date.getMonth() + sign * monthsToCalc);

  if (m || y) {
    //если сегодня последний день месяца, то после прибавления/вычитания месяцев тоже должен быть последний день
    if (date.getDate() === getMonthLastDay(date)) {
      newDate.setDate(getMonthLastDay(newDate));
    }
    //если итоговый месяц февраль, а текущая дата 31,30,29, то берем последний день февраля новой даты
    else if (newDate.getMonth() === 1 &&
      (date.getDate() === 31 || date.getDate() === 30 || date.getDate() === 29)) {
      newDate.setDate(getMonthLastDay(newDate));
    }
    //в остальных случаях оставляем тот же день месяца
    else {
      newDate.setDate(date.getDate());
    }
  }

  if (d) {
    newDate.setDate(newDate.getDate() + sign * d);
  }

  console.log('New Date:', newDate);
}

const nowDate = new Date();
const dateParams = {};
getDateParams();

console.log(getMonthLastDay(new Date()));
console.log(isLeapYear(new Date(2020, 1, 1)));

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
if (argv._.includes('add')) {
  /*if (Object.keys(dateParams).length) {
    for (let val in dateParams)
      console.log(dateParams[val]);
  } else {
    console.log(nowDate.toISOString());
  }*/
}

calculateDate(1, 1, 2, 5);

