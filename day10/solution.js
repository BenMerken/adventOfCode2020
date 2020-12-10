'use strict';

const fs = require('fs');
const path = require('path');

const joltages = fs.readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8').split('\r\n').map(joltage => +joltage);

const solution1 = () => {
    const joltagesSorted = joltages.sort((a, b) => a > b ? 1 : -1);
    const joltageDifferences = [1];

    joltagesSorted.slice(1).forEach((joltage, index) => {
      joltageDifferences.push(joltage - joltagesSorted[index]);
    });
    joltageDifferences.push(3);

    const solution = joltageDifferences.filter(joltage => joltage === 1).length * joltageDifferences.filter(joltage => joltage === 3).length;

    console.log('Solution 1: ', solution);
}

solution1();
