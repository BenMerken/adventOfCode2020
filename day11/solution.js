'use strict';

const fs = require('fs');
const path = require('path');

let seats = fs
  .readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8')
  .split('\r\n')
  .map((seatsRow) => '.' + seatsRow + '.');

seats.unshift('.'.repeat(seats[0].length));
seats.push('.'.repeat(seats[0].length));
seats = seats.map((seatsRow) => seatsRow.split(''));

const getNewSeatMap = (oldSeatMap) => {
  const newSeatMap = oldSeatMap.map(seatsRow => seatsRow.map(seat => seat));
  oldSeatMap.slice(1, oldSeatMap.length - 1).forEach((seatsRow, rowIndex) =>
    seatsRow.slice(1, seatsRow.length - 1).forEach((seat, colIndex) => {
      const adjacentSeats = [];

      oldSeatMap[rowIndex]
        .slice(colIndex, colIndex + 3)
        .forEach((seatRowUp) => adjacentSeats.push(seatRowUp));
      oldSeatMap[rowIndex + 2]
        .slice(colIndex, colIndex + 3)
        .forEach((seatRowDown) => adjacentSeats.push(seatRowDown));
      adjacentSeats.push(seatsRow[colIndex]);
      adjacentSeats.push(seatsRow[colIndex + 2]);

      const occupiedAdjecentSeats = adjacentSeats.join('').match(/#/g);
      seat === 'L' &&
        adjacentSeats.indexOf('#') === -1 &&
        (newSeatMap[rowIndex + 1][colIndex + 1] = '#');
      seat === '#' &&
        occupiedAdjecentSeats &&
        occupiedAdjecentSeats.length >= 4 &&
        (newSeatMap[rowIndex + 1][colIndex + 1] = 'L');
    })
  );

  return newSeatMap;
};

const solution1 = () => {
  let seatsMap = seats.map(seatsRow => seatsRow.map(seat => seat));
  let oldSeatsMap = seatsMap.map(seatsRow => seatsRow.map(seat => seat));
  while (
    (seatsMap = getNewSeatMap(seatsMap))
      .map((seatsRow) => seatsRow.join(''))
      .join('') !== oldSeatsMap.map((seatsRow) => seatsRow.join('')).join('')
  ) {
    oldSeatsMap = seatsMap.map(seatsRow => seatsRow.map(seat => seat));
  }

  console.log(
    'Solution 1: ',
    seatsMap
      .map((seatsRow) => seatsRow.join(''))
      .join('')
      .match(/#/g).length
  );
};

solution1();
