'use strict';

const fs = require('fs');
const path = require('path');

const instructions = fs
  .readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8')
  .split('\r\n');

const solution1 = () => {
  const ranInstructionsIndices = [];
  let acc = 0;
  let nextInstructionIndex = 0;

  while (!ranInstructionsIndices.includes(nextInstructionIndex)) {
    ranInstructionsIndices.push(nextInstructionIndex);

    const instruction = instructions[nextInstructionIndex];
    const [operation, argument] = instruction.split(' ');

    operation === 'acc' && (acc += +argument) && (nextInstructionIndex += 1);
    operation === 'jmp' && (nextInstructionIndex += +argument);
    operation === 'nop' && (nextInstructionIndex += 1);
  }

  console.log('Solution 1, ', acc);
};

solution1();
