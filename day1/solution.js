'use strict';

const fs = require('fs');
const path = require('path');

const numbers = fs
  .readFileSync(path.resolve(__dirname + '/puzzle.txt'), 'utf-8')
  .split('\n');

const solution1 = () => {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - 1; j++) {
      if (+numbers[i] + +numbers[j] === 2020) {
        console.log('Solution 1: ', numbers[i] * numbers[j]);
        return;
      }
    }
  }
};

const solution2 = () => {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - 1; j++) {
      for (let k = 0; k < numbers.length - 1; k++) {
        if (+numbers[i] + +numbers[j] + +numbers[k] === 2020) {
          console.log('Solution 2: ', numbers[i] * numbers[j] * numbers[k]);
          return;
        }
      }
    }
  }
};

solution1();
solution2();
