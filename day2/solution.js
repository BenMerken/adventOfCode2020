'use strict';

const fs = require('fs');
const path = require('path');

const passwords = fs
  .readFileSync(path.resolve(__dirname + '/puzzle.txt'), 'utf-8')
  .split('\n');

const solution1 = () => {
  let valid = 0;

  passwords.forEach((line) => {
    const least = +line.substring(0, line.indexOf('-'));
    const most = +line.substring(line.indexOf('-') + 1, line.indexOf(' '));
    const policy = line.substring(line.indexOf(' ') + 1, line.indexOf(':'));
    const password = line.substring(line.indexOf(':') + 2);
    let count = 0;

    password.split('').forEach((char) => char === policy && (count += 1));

    least <= count && most >= count && (valid += 1);
  });

  console.log('Solution 1: ', valid);
};

const solution2 = () => {
  let validCount = 0;
  passwords.forEach((line) => {
    const first = +line.substring(0, line.indexOf('-'));
    const second = +line.substring(line.indexOf('-') + 1, line.indexOf(' '));
    const policy = line.substring(line.indexOf(' ') + 1, line.indexOf(':'));
    const password = line.substring(line.indexOf(':') + 2);

    const firstMatch =  password.substring(first - 1, first) === policy;
    const secondMatch = password.substring(second - 1, second) === policy;

    (firstMatch !== secondMatch) && (validCount += 1);
  });

  console.log('Solution 2: ', validCount);
};

solution1();
solution2();
