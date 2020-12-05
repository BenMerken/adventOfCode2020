'use strict';

const fs = require('fs');
const path = require('path');

const lines = fs
  .readFileSync(path.resolve(__dirname + '/puzzle.txt'), 'utf-8')
  .split('\r\n');
const indexCountPerLine = lines[0].split('').length;

const getTreesCount = (sledPath) => {
  let treesCount = 0;
  let position = 0;

  for (let index = 0; index < lines.length - sledPath[1]; index += sledPath[1]) {
    position += sledPath[0];
    position >= indexCountPerLine && (position = position % indexCountPerLine);

    lines[index + sledPath[1]].split('')[position] === '#' && (treesCount += 1);
  }
  
  return treesCount;
};

const solution1 = () => {
  const treesCount = getTreesCount([3, 1]);

  console.log('Solution 1: ', treesCount);
};

const solution2 = () => {
  const sledPaths = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const treesPerPath = [];
  sledPaths.forEach(sledPath => treesPerPath.push(getTreesCount(sledPath)));

  console.log('Solution 2: ', treesPerPath.reduce((acc, curr) => acc * curr));
};

solution1();
solution2();
