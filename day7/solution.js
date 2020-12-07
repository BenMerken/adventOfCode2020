'use strict';

const fs = require('fs');
const path = require('path');

const lines = fs
  .readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8')
  .split('\r\n');

const solution1 = () => {
    let bagsContainingMyBag = lines
    .map((line) => line.match(/^.+shiny gold bag/))
    .filter((line) => line)
    .map((line) => line.input)
    .map((line) => line.substring(0, line.match(/ bags/).index));
    let newBagsFoundCount = bagsContainingMyBag.length;
    let newBagsFound = true;

  while (newBagsFound) {
    const newBagsFoundCountPrevious = newBagsFoundCount;

    bagsContainingMyBag = lines
    .map(line => line.match(`.+(${bagsContainingMyBag.reduce((acc, curr) => `${acc}|${curr}`)+ '|shiny gold'})`))
    .filter((line) => line)
    .map((line) => line.input)
    .map((line) => line.substring(0, line.match(/ bags/).index));

    newBagsFoundCount = bagsContainingMyBag.length;
    newBagsFoundCount === newBagsFoundCountPrevious && (newBagsFound = false);
  }

  console.log('Solution 1: ', newBagsFoundCount);
};

const solution2 = () => {

};

solution1();
