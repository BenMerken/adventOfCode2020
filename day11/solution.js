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

const getNewSeatMap1 = (oldSeatMap) => {
  const newSeatMap = oldSeatMap.map((seatsRow) => seatsRow.map((seat) => seat));
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

const getNewSeatMap2 = (oldSeatMap) => {
  const newSeatMap = oldSeatMap.map((seatsRow) => seatsRow.map((seat) => seat));
  oldSeatMap.forEach((seatsRow, rowIndex) =>
    seatsRow.forEach((seat, colIndex) => {
      const adjacentSeats = {
        top: [colIndex, Number.MIN_VALUE, '.'],
        topRight: [Number.MAX_VALUE, Number.MIN_VALUE, '.'],
        right: [Number.MAX_VALUE, rowIndex, '.'],
        downRight: [Number.MAX_VALUE, Number.MAX_VALUE, '.'],
        down: [colIndex, Number.MAX_VALUE, '.'],
        downleft: [Number.MIN_VALUE, Number.MAX_VALUE, '.'],
        left: [Number.MIN_VALUE, rowIndex, '.'],
        topLeft: [Number.MIN_VALUE, Number.MIN_VALUE, '.'],
      };

      oldSeatMap.forEach((seatsRowCoord, rowIndexCoord) =>
        seatsRowCoord.forEach((seatCoord, colIndexCoord) => {
          if (
            (rowIndex !== rowIndexCoord ||
            colIndex !== colIndexCoord) && seatCoord !== '.' && seat !== '.'
          ) {
            //diagonals
            rowIndexCoord - rowIndex === colIndexCoord - colIndex &&
              colIndex > colIndexCoord &&
              adjacentSeats.topLeft[0] < colIndexCoord &&
              (adjacentSeats.topLeft = [
                colIndexCoord,
                rowIndexCoord,
                seatCoord,
              ]);
            rowIndexCoord - rowIndex === colIndexCoord - colIndex &&
              colIndex < colIndexCoord &&
              adjacentSeats.downRight[0] > colIndexCoord &&
              (adjacentSeats.downRight = [
                colIndexCoord,
                rowIndexCoord,
                seatCoord,
              ]);
            rowIndexCoord - rowIndex === -(colIndexCoord - colIndex) &&
              colIndex > colIndexCoord &&
              adjacentSeats.downleft[0] < colIndexCoord &&
              (adjacentSeats.downleft = [
                colIndexCoord,
                rowIndexCoord,
                seatCoord,
              ]);
            rowIndexCoord - rowIndex === -(colIndexCoord - colIndex) &&
              colIndex < colIndexCoord &&
              adjacentSeats.topRight[0] > colIndexCoord &&
              (adjacentSeats.topRight = [
                colIndexCoord,
                rowIndexCoord,
                seatCoord,
              ]);

            // straights
            rowIndexCoord === rowIndex &&
              colIndex > colIndexCoord &&
              adjacentSeats.left[0] < colIndexCoord &&
              (adjacentSeats.left = [colIndexCoord, rowIndexCoord, seatCoord]);
            rowIndexCoord === rowIndex &&
              colIndex < colIndexCoord &&
              adjacentSeats.right[0] > colIndexCoord &&
              (adjacentSeats.right = [colIndexCoord, rowIndexCoord, seatCoord]);
            colIndexCoord === colIndex &&
              rowIndex < rowIndexCoord &&
              adjacentSeats.down[1] > rowIndexCoord &&
              (adjacentSeats.down = [colIndexCoord, rowIndexCoord, seatCoord]);
            colIndexCoord === colIndex &&
              rowIndex > rowIndexCoord &&
              adjacentSeats.top[1] < rowIndexCoord &&
              (adjacentSeats.top = [colIndexCoord, rowIndexCoord, seatCoord]);
          }
        })
      );
      const adjacentSeatsArr = Object.values(adjacentSeats).map(
        (adjacentSeat) => adjacentSeat[2]
      );

      const occupiedAdjecentSeats = adjacentSeatsArr.join('').match(/#/g);
      seat === 'L' &&
        adjacentSeatsArr.indexOf('#') === -1 &&
        (newSeatMap[rowIndex][colIndex] = '#');
      seat === '#' &&
        occupiedAdjecentSeats &&
        occupiedAdjecentSeats.length >= 5 &&
        (newSeatMap[rowIndex][colIndex] = 'L');
    })
  );

  return newSeatMap;
};

const solution1 = () => {
  let seatsMap = seats.map((seatsRow) => seatsRow.map((seat) => seat));
  let oldSeatsMap = seatsMap.map((seatsRow) => seatsRow.map((seat) => seat));
  while (
    (seatsMap = getNewSeatMap1(seatsMap))
      .map((seatsRow) => seatsRow.join(''))
      .join('') !== oldSeatsMap.map((seatsRow) => seatsRow.join('')).join('')
  ) {
    oldSeatsMap = seatsMap.map((seatsRow) => seatsRow.map((seat) => seat));
  }

  console.log(
    'Solution 1: ',
    seatsMap
      .map((seatsRow) => seatsRow.join(''))
      .join('')
      .match(/#/g).length
  );
};

const solution2 = () => {
  let seatsMap = seats.map((seatsRow) => seatsRow.map((seat) => seat));
  let oldSeatsMap = seatsMap.map((seatsRow) => seatsRow.map((seat) => seat));
  while (
    (seatsMap = getNewSeatMap2(seatsMap))
      .map((seatsRow) => seatsRow.join(''))
      .join('') !== oldSeatsMap.map((seatsRow) => seatsRow.join('')).join('')
  ) {
    oldSeatsMap = seatsMap.map((seatsRow) => seatsRow.map((seat) => seat));
  }

  console.log(
    'Solution 2: ',
    seatsMap
      .map((seatsRow) => seatsRow.join(''))
      .join('')
      .match(/#/g).length
  );

  console.log(seatsMap
    .map((seatsRow) => seatsRow.join('') + '\r\n')
    .join(''))
};

solution1();
solution2();
