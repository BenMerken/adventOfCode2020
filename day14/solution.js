'use strict';

const fs = require('fs');
const path = require('path');

const blocks = [];
const bitmasks = fs.readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8')
    .split('\r\n')
    .filter(line => line.match(/mask/))
    .map(line => line.substring(line.indexOf('= ') + 2));
fs.readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8')
    .split('\r\n')
    .forEach(line => line.match(/mask/) && (blocks.push([])) || line.match(/mem/) && (blocks[blocks.length - 1].push(line)));
blocks.forEach((block, index, self) => self[index] = block.map(line => [+line.substring(line.indexOf('[') + 1, line.indexOf(']')), +line.substring(line.indexOf('= ') + 2)]));

const addressSpace = [];

const dec2bin = (decimal) => {
  let bin = (decimal >>> 0).toString(2);
  while (bin.length !== bitmasks[0].length) bin = '0' + bin;

  return bin
};

const bin2dec = (bitstring) => parseInt(bitstring, 2);

const overwrite = (malloc, mask) => {
    addressSpace[malloc[0]] = bin2dec(dec2bin(malloc[1]).split('').map((char, index) => +mask[index] === 1 ? 1 : (+mask[index] === 0 ? 0 : char)).join(''));
};

const solution1 = () => {
  blocks.forEach((block, index) => block.forEach(line => overwrite(line, bitmasks[index])));
  
  console.log('Solution 1: ', addressSpace.reduce((acc, curr) => acc + curr));
};

solution1();
