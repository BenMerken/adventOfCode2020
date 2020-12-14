'use strict';

const fs = require('fs');
const path = require('path');

let [timestamp, buses] = fs
  .readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8')
  .split('\r\n');
timestamp = +timestamp;
buses = buses.split(',');

const solution1 = () => {
  const actualBuses = buses.filter((busId) => busId !== 'x');
  const busesAndMinutes = [];
  actualBuses.forEach((busId) => {
    let minutesPassed = 0;

    while ((timestamp + minutesPassed) % busId !== 0) {
      minutesPassed++;
    }

    busesAndMinutes.push(busId * minutesPassed);
  });

  console.log('Solution 1: ', Math.min(...busesAndMinutes));
};

const solution2 = () => {
  const actualBuses = buses.filter((busId) => busId !== 'x');
  const minutesPlusTimestamp = {};
  let earliestTimestamp = 100000000000000;
  actualBuses.forEach(
    (busId) => (minutesPlusTimestamp[busId] = buses.indexOf(busId))
  );

  while (!Object.entries(minutesPlusTimestamp).every(([key, value]) => (earliestTimestamp + value) % +key === 0)) {
    earliestTimestamp++;
  }

  console.log('Solution 2: ', earliestTimestamp);
};

solution1();
solution2();
