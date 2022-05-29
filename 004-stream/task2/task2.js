#!node

//c:\Work\Materials\NodeJS\NDSE-13\004-stream\task1\out.txt
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');

const argv = yargs(hideBin(process.argv)).argv;

if (argv.GameFileName) {
  const fileName = argv.GameFileName;
  const readerStream = fs.createReadStream(fileName);

  let data;

  readerStream
    .setEncoding('UTF8')
    .on('data', (chank) => {
      data += chank;
    })
    .on('end', () => {
      const games = data.split('\n').filter((item) => item);
      const results = games.reduce(
        (previousValue, currentValue) => {
          if (currentValue.includes('Win!')) {
            return { wins: previousValue.wins + 1, lose: previousValue.lose };
          } else {
            return { wins: previousValue.wins, lose: previousValue.lose + 1 };
          }
        },
        { wins: 0, lose: 0 },
      );

      console.log('Общее количество партий: ', results.wins + results.lose);
      console.log(
        'Количество выигранных / проигранных партий: ',
        `${results.wins}/${results.lose}`,
      );
      console.log(
        'Процентное соотношение выигранных партий: ',
        parseFloat(
          (100 * results.wins) / (results.wins + results.lose),
          2,
        ).toFixed(2),
        '%',
      );
    });
} else {
  console.log('GameFileName argument required!');
}
