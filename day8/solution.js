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

  console.log('Solution 1: ', acc);

  return { acc, ranInstructionsIndices };
};

const solution = () => {
  const { ranInstructionsIndices } = solution1();
  let newRanInstructionsIndices;
  let newInstructions;
  let nextInstructionIndex = 0;
  let acc = 0;
  let ranInstructionIndex = 0;

  while (nextInstructionIndex < instructions.length) {
    newRanInstructionsIndices = [];
    newInstructions = [...instructions];
    nextInstructionIndex = 0;
    acc = 0;

    const instructionToChangeIndex = ranInstructionsIndices[ranInstructionIndex];
    ranInstructionIndex += 1;
    newInstructions[instructionToChangeIndex].includes('nop') && (newInstructions[instructionToChangeIndex] = newInstructions[instructionToChangeIndex].replace('nop', 'jmp'));
    newInstructions[instructionToChangeIndex].includes('jmp') && (newInstructions[instructionToChangeIndex] = newInstructions[instructionToChangeIndex].replace('jmp', 'nop'));

    while (!newRanInstructionsIndices.includes(nextInstructionIndex) && nextInstructionIndex < instructions.length) {
      newRanInstructionsIndices.push(nextInstructionIndex);

      const instruction = newInstructions[nextInstructionIndex];
      const [operation, argument] = instruction.split(' ');

      operation === 'acc' && (acc += +argument) && (nextInstructionIndex += 1);
      operation === 'jmp' && (nextInstructionIndex += +argument);
      operation === 'nop' && (nextInstructionIndex += 1);

    }
  }

  console.log('Solution 2: ', acc);
};

solution();
