'use strict';

const fs = require('fs');
const path = require('path');

let [timestamp, buses] = fs.readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8').split('\r\n');
timestamp = +timestamp;
buses = buses.split(',').filter(bus => bus !== 'x').map(bus => +bus);

const solution1 = () => {
    const busesAndMinutes = [];
    buses.forEach(busId => {
        let minutesPassed = 0;

        while ((timestamp + minutesPassed) % busId !== 0) {
            minutesPassed++;
        }

        busesAndMinutes.push(busId * minutesPassed);
    });

    console.log('Solution 1: ', Math.min(...busesAndMinutes));
};

solution1();
