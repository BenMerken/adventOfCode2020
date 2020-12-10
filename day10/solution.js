'use strict';

const fs = require('fs');
const path = require('path');

const joltages = fs.readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8').split('\r\n').map(joltage => +joltage);

const sortAlg = (a, b) => a > b ? 1 : -1; 

const getJoltageDifferences = () => {
    const joltagesSorted = [0];
    const joltageDifferences = [];

    joltages.sort(sortAlg).map(joltage => +joltage).forEach(joltage => joltagesSorted.push(joltage));
    joltagesSorted.push(joltagesSorted[joltagesSorted.length - 1] + 3);
    joltagesSorted.slice(1).forEach((joltage, index) => {
      joltageDifferences.push(joltage - joltagesSorted[index]);
    });

    return joltageDifferences;
};

const solution1 = () => {
    const joltageDifferences = getJoltageDifferences();

    const solution = joltageDifferences.filter(joltage => joltage === 1).length * joltageDifferences.filter(joltage => joltage === 3).length;

    console.log('Solution 1: ', solution);
}

solution1();
