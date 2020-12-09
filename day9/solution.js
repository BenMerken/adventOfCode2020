'use strict';

const fs = require('fs');
const path = require('path');

const numbers = fs
  .readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8')
  .split('\r\n')
  .map((num) => +num);

const solution1 = () => {
  let descrepancy = 0;

    numbers.slice(25).forEach((number, index) => {
      const numbersBefore = numbers.slice(index, index + 25);
      const sumsOtherHalves = [];
      numbersBefore.forEach((numberBefore) => {
        numbersBefore.includes(number - numberBefore) &&
          sumsOtherHalves.push(numberBefore);
      });
      (sumsOtherHalves.length === 0) && (descrepancy = number);
    });

  console.log('Solution 1: ', descrepancy);
};

solution1();
