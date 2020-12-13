'use strict';

const fs = require('fs');
const path = require('path');

const instructions = fs.readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8').split('\r\n');

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

    const changeFacingLeft = () => {
        let newFacing;
        currentFacing === 'N' && (newFacing = 'W');
        currentFacing === 'E' && (newFacing = 'N');
        currentFacing === 'S' && (newFacing = 'E');
        currentFacing === 'W' && (newFacing = 'S');
      
        return newFacing;
      };
      
      const changeFacingRight = () => {
          let newFacing;
          currentFacing === 'N' && (newFacing = 'E');
          currentFacing === 'E' && (newFacing = 'S');
          currentFacing === 'S' && (newFacing = 'W');
          currentFacing === 'W' && (newFacing = 'N');
      
          return newFacing;
      };            

    instructions.forEach(instruction => {
      const [direction, steps] = [instruction.substring(0,1), +instruction.substring(1)];

      direction === 'N' && (stepsInDirections.north += steps);
      direction === 'E' && (stepsInDirections.east += steps);
      direction === 'S' && (stepsInDirections.south += steps);
      direction === 'W' && (stepsInDirections.west += steps);
      direction === 'L' && (Array(steps  / 90).fill().forEach(() => currentFacing = changeFacingLeft()));
      direction === 'R' && (Array(steps / 90).fill().forEach(() => currentFacing = changeFacingRight()));
      direction === 'F' && (sailForward(steps))
    });

    const northSouth = stepsInDirections.north > stepsInDirections.south
     ? stepsInDirections.north - stepsInDirections.south : stepsInDirections.south - stepsInDirections.north;
     const eastWest = stepsInDirections.east > stepsInDirections.west
     ? stepsInDirections.east - stepsInDirections.west : stepsInDirections.west - stepsInDirections.east;

     console.log('Solution 1: ', northSouth + eastWest)
};

const solution2 = () => {
    const shipPosition = {N: 0, E: 0, S: 0, W: 0};
    let waypointRelativePosition = [[10, 'E'], [1, 'N']];

    const turnWayPointLeft = () => {
        switch (waypointRelativePosition[0][1]) {
            case 'N':
                (waypointRelativePosition[0][1] = 'W') && (waypointRelativePosition[1][1] = 'S');
                break;
            case 'E':
                (waypointRelativePosition[0][1] = 'N') && (waypointRelativePosition[1][1] = 'W');
                break;
            case 'S':
                (waypointRelativePosition[0][1] = 'E') && (waypointRelativePosition[1][1] = 'N');
                break;
            case 'W':
                (waypointRelativePosition[0][1] = 'S') && (waypointRelativePosition[1][1] = 'E');
                break;
        }
    };

    const turnWaypointRight = () => {
        switch (waypointRelativePosition[0][1]) {
            case 'N':
                (waypointRelativePosition[0][1] = 'E') && (waypointRelativePosition[1][1] = 'N');
                break;
            case 'E':
                (waypointRelativePosition[0][1] = 'S') && (waypointRelativePosition[1][1] = 'E');
                break;
            case 'S':
                (waypointRelativePosition[0][1] = 'W') && (waypointRelativePosition[1][1] = 'S');
                break;
                case 'W':
                (waypointRelativePosition[0][1] = 'N') && (waypointRelativePosition[1][1] = 'W');
                break;
        }
    };

    const moveWaypoint = (direction, steps) => {
        let inverse;
        direction === 'N' && (inverse = 'S');
        direction === 'E' && (inverse = 'W');
        direction === 'S' && (inverse = 'N');
        direction === 'W' && (inverse = 'E');

        waypointRelativePosition.forEach(position => position.indexOf(direction) > -1 && (position[0] += steps));
        waypointRelativePosition.forEach(position => position.indexOf(inverse) > -1 && (position[0] -= steps));
    };

    const sailForward = (multiplier) => {
        waypointRelativePosition.forEach(position => shipPosition[`${position[1]}`] += position[0] * multiplier);
    };

    instructions.forEach(instruction => {
        const [direction, steps] = [instruction.substring(0, 1), +instruction.substring(1)];

        direction.match(/(N|E|S|W)/) && (moveWaypoint(direction, steps));
        direction === 'L' && (Array(steps  / 90).fill().forEach(() => turnWayPointLeft()));
        direction === 'R' && (Array(steps / 90).fill().forEach(() => turnWaypointRight()));
        direction === 'F' && (sailForward(steps));
    });

    const northSouth = shipPosition.N > shipPosition.S
     ? shipPosition.N - shipPosition.S : shipPosition.S - shipPosition.N;
     const eastWest = shipPosition.E > shipPosition.W
     ? shipPosition.E - shipPosition.W : shipPosition.W - shipPosition.E;

    console.log('Solution 2: ', northSouth + eastWest);
};

solution1();
solution2();
