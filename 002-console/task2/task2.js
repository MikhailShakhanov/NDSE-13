#!node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const readline = require('readline')

const input = readline.createInterface(process.stdin)

input.on('line', (data) => console.log(data))
input.on('close', () => console.log('This is the end'))