'use strict';

const fs = require('fs');
const path = require('path');

const answerGroups = fs.readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8').split('\r\n\r\n');

const solution1 = () => {
    console.log('Solution 1: ', answerGroups.map(group => [...new Set(group.split('').filter(letter => letter !== '\n' && letter !== '\r'))].length).reduce((acc, curr) => acc + curr));
};

const solution2 = () => {
    let sumOfCounts = 0;
    const lineCountsPerGroup = answerGroups.map(group => group.split('\n').length);
    const lettersPerGroup = answerGroups.map(group => group.split('\n').map(line => line.split('').filter(letter => letter !== '\r')).join().split(',').sort());
    const uniqueLettersPerGroup = lettersPerGroup.map(letter => [...new Set(letter)]);

    uniqueLettersPerGroup.forEach((letters, index) => letters.forEach(uniqueLetter => {
        let lettersCounted = 0;

        lettersPerGroup[index].forEach(letterInGroup => letterInGroup === uniqueLetter && (lettersCounted++));

        lettersCounted === lineCountsPerGroup[index] && (sumOfCounts++);
    }));

    console.log('Solution 2: ', sumOfCounts);
};

solution1();
solution2();