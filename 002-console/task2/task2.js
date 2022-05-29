#!node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const readline = require('readline');
const GuessNumber = require('./GuessNumber');

const input = readline.createInterface(process.stdin);
const guessNumber = new GuessNumber();

input.on('line', (data) => guessNumber.tryToGuess(data));
input.on('close', () => console.log('This is the end'));
//guessNumber.showAnswer();