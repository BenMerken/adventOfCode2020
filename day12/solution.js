'use strict';

const fs = require('fs');
const path = require('path');

const instructions = fs.readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8').split('\r\n');

const changeFacingLeft = (currentFacing) => {
  let newFacing;
  currentFacing === 'N' && (newFacing = 'W');
  currentFacing === 'E' && (newFacing = 'N');
  currentFacing === 'S' && (newFacing = 'E');
  currentFacing === 'W' && (newFacing = 'S');

  return newFacing;
};

const changeFacingRight = (currentFacing) => {
    let newFacing;
    currentFacing === 'N' && (newFacing = 'E');
    currentFacing === 'E' && (newFacing = 'S');
    currentFacing === 'S' && (newFacing = 'W');
    currentFacing === 'W' && (newFacing = 'N');

    return newFacing;
};

const solution1 = () => {
    let currentFacing = 'E';
    const stepsInDirections = {
        north: 0,
        east: 0,
        south: 0,
        west: 0
    }

    const sailForward = (steps) => {
        currentFacing === 'N' && (stepsInDirections.north += steps);
        currentFacing === 'E' && (stepsInDirections.east += steps);
        currentFacing === 'S' && (stepsInDirections.south += steps);
        currentFacing === 'W' && (stepsInDirections.west  += steps);
    };
    

    instructions.forEach(instruction => {
      const [direction, steps] = [instruction.substring(0,1), +instruction.substring(1)];

      direction === 'N' && (stepsInDirections.north += steps);
      direction === 'E' && (stepsInDirections.east += steps);
      direction === 'S' && (stepsInDirections.south += steps);
      direction === 'W' && (stepsInDirections.west += steps);
      direction === 'L' && (Array(steps  / 90).fill().forEach(() => currentFacing = changeFacingLeft(currentFacing)));
      direction === 'R' && (Array(steps / 90).fill().forEach(() => currentFacing = changeFacingRight(currentFacing)));
      direction === 'F' && (sailForward(steps))
    });

    const northSouth = stepsInDirections.north > stepsInDirections.south
     ? stepsInDirections.north - stepsInDirections.south : stepsInDirections.south - stepsInDirections.north;
     const eastWest = stepsInDirections.east > stepsInDirections.west
     ? stepsInDirections.east - stepsInDirections.west : stepsInDirections.west - stepsInDirections.east;

     console.log('Solution 1: ', northSouth + eastWest)
};

solution1();
