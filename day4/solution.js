'use strict';

const fs = require('fs');
const path = require('path');

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
const passports = fs
  .readFileSync(path.resolve(__dirname + '/puzzle.txt'), 'utf-8')
  .split('\r\n\r\n');

const getValidPasswordsCount = (rules) => {
  let validPassportCount = 0;

  passports.forEach((passport) => {
    rules.every((rule) => passport.indexOf(rule) >= 0) &&
      (validPassportCount += 1);
  });

  return validPassportCount;
};

const getValidPasswordsCountStrict = (rules) => {
  let validPassportCount = 0;

  const passportsWithAllFields = passports.filter((passport) =>
    rules.every((rule) => passport.indexOf(rule) >= 0)
  );

  passportsWithAllFields.forEach((passport) => {
    const valuePairs = passport.split(/[\r\n, ]/).filter((pair) => pair !== '');
    let passportOk = true;

    valuePairs.forEach((pair) => {
      const pairArray = pair.split(':');

      switch (pairArray[0]) {
        case 'byr':
          (pairArray[1].split('').length !== 4 ||
            !(+pairArray[1] >= 1920 && +pairArray[1] <= 2002)) &&
            (passportOk = false);
          break;
        case 'iyr':
          (pairArray[1].split('').length !== 4 ||
            !(+pairArray[1] >= 2010 && +pairArray[1] <= 2020)) &&
            (passportOk = false);
          break;
        case 'eyr':
          (pairArray[1].split('').length !== 4 ||
            !(+pairArray[1] >= 2020 && +pairArray[1] <= 2030)) &&
            (passportOk = false);
          break;
        case 'hgt':
          const unitFound = pairArray[1].match(/([cm,in]{2})$/);
          !unitFound && (passportOk = false);
          if (unitFound) {
            const unit = unitFound[0];
            const value = +pairArray[1].split(unit)[0];
            unit === 'cm' &&
              !(value >= 150 && value <= 193) &&
              (passportOk = false);
            unit === 'in' &&
              !(value >= 59 && value <= 76) &&
              (passportOk = false);
          }
          break;
        case 'hcl':
          !pairArray[1].match(/^#([0-9a-f]{6})$/) && (passportOk = false);
          break;
        case 'ecl':
          !pairArray[1].match(/^(amb|blu|brn|gry|grn|hzl|oth)$/) &&
            (passportOk = false);
          break;
        case 'pid':
          !pairArray[1].match(/^([0-9]{9})$/) && (passportOk = false);
          break;
        case 'cid':
          break;
      }
    });

    passportOk && (validPassportCount += 1);
  });

  return validPassportCount;
};

console.log(
  'Solution 1: ',
  getValidPasswordsCount(requiredFields.filter((field) => field !== 'cid'))
);
console.log(
  'Solution 2: ',
  getValidPasswordsCountStrict(
    requiredFields.filter((field) => field !== 'cid')
  )
);
