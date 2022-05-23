//последний день месяца
function getMonthLastDay(date) {
  return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
}

//вычисление даты
function calculateDate(sign = 1, y = 0, m = 0, d = 0) {

  const date = new Date();
  const newDate = new Date();

  newDate.setDate(1);
  const monthsToCalc = y ? 12 * y + m : m;

  newDate.setMonth(date.getMonth() + sign * monthsToCalc);

  if (y || m) {
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
    newDate.setDate(date.getDate() + sign * d);
  }

  console.log(newDate.toISOString());
}

module.exports = calculateDate;