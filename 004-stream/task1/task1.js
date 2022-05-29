#!node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');
const argv = yargs(hideBin(process.argv)).argv;

const readline = require('readline');
const CoinGame = require('./CoinGame');

const fileName = argv._[0];
const writeStream = fs.createWriteStream(fileName, { flags: 'a' });

const input = readline.createInterface(process.stdin);

const guessValue = new CoinGame();

input.on('line', (data) => {
  writeStream.write(
    `Игра: ${guessValue.getGameName()};\n` +
      `Результат: ${guessValue.tryToGuess(data)}\n`,
    'UTF8',
  );
  writeStream.end();
  input.close();
});
input.on('close', () => console.log('This is the end of the game'));
