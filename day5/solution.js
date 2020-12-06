'use strict';

const fs = require('fs');
const path = require('path');

const partitions = fs
  .readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8')
  .split('\r\n');

const getSeatsList = () => {
  const seats = [];

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 127; j++) {
      seats.push([j, i]);
    }
  }

  return seats;
};

const getOccupiedSeats = () => {
  const occupiedSeats = [];

  partitions.forEach((partition) => {
    const rowLetters = partition.split('').slice(0, 7);
    const colLetters = partition.split('').slice(7);
    let rowSeats = Array.from(Array(128).keys());
    let colSeats = Array.from(Array(8).keys());
    const seat = [];

    rowLetters.forEach((letter) => {
      const rowSeatsLow = rowSeats.slice(0, Math.ceil(rowSeats.length / 2));
      const rowSeatsHigh = rowSeats.slice(Math.ceil(rowSeats.length / 2));

      letter === 'F' && (rowSeats = rowSeatsLow);
      letter === 'B' && (rowSeats = rowSeatsHigh);
    });

    seat.push(rowSeats.pop());

    colLetters.forEach((letter) => {
      const colSeatsLow = colSeats.slice(0, Math.ceil(colSeats.length / 2));
      const colSeatsHigh = colSeats.slice(Math.ceil(colSeats.length / 2));

      letter === 'R' && (colSeats = colSeatsHigh);
      letter === 'L' && (colSeats = colSeatsLow);
    });

    seat.push(colSeats.pop());
    occupiedSeats.push(seat);
  });

  return occupiedSeats;
};

const solution1 = () => {
  let highestId = 0;
  const occupiedSeats = getOccupiedSeats();

  occupiedSeats.forEach((seat) => {
    const id = seat[0] * 8 + seat[1];
    id > highestId && (highestId = id);
  });

  console.log('Solution 1: ', highestId);
};

const solution2 = () => {
  const seatsList = getSeatsList();
  const occupiedSeats = getOccupiedSeats();
  const unoccupiedSeats = [];

  seatsList.forEach(seat => {
      let match = false;
      occupiedSeats.forEach(occupied => {
        (seat[0] === occupied[0] && seat[1] === occupied[1]) && (match = true);
      });
      !match && unoccupiedSeats.push(seat);
  });
  const occupiedSeatsIds = occupiedSeats.map(seat => seat[0] * 8 + seat[1]);
  const unoccupiedSeatsIds = unoccupiedSeats.map(seat => seat[0] * 8 + seat[1]);
  const mySeatId = unoccupiedSeatsIds.filter(id => occupiedSeatsIds.includes(id - 1) && occupiedSeatsIds.includes(id + 1));

  console.log(mySeatId);
};

solution1();
solution2();
