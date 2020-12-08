'use strict';

const fs = require('fs');
const path = require('path');

const lines = fs
  .readFileSync(path.resolve(__dirname, 'puzzle.txt'), 'utf-8')
  .split('\r\n');

const solution1 = () => {
  let bagsContainingMyBag = lines
    .map((line) => line.match(/^.+shiny gold bag/))
    .filter((line) => line)
    .map((line) => line.input)
    .map((line) => line.substring(0, line.match(/ bags/).index));
  let newBagsFoundCount = bagsContainingMyBag.length;
  let newBagsFound = true;

  while (newBagsFound) {
    const newBagsFoundCountPrevious = newBagsFoundCount;

    bagsContainingMyBag = lines
      .map((line) =>
        line.match(
          `.+(${
            bagsContainingMyBag.reduce((acc, curr) => `${acc}|${curr}`) +
            '|shiny gold'
          })`
        )
      )
      .filter((line) => line)
      .map((line) => line.input)
      .map((line) => line.substring(0, line.match(/ bags/).index));

    newBagsFoundCount = bagsContainingMyBag.length;
    newBagsFoundCount === newBagsFoundCountPrevious && (newBagsFound = false);
  }

  console.log('Solution 1: ', newBagsFoundCount);
};

const bagMap = new Map();

lines.forEach((line) => {
  const [currentBag, bagsInCurrentBag] = line.split(' bags contain ');

  bagsInCurrentBag
    .replace(/\./, '')
    .split(', ')
    .map((bagInCurrentBag) => {
      const { groups } = /((?<count>\d+) )?(?<type>.*)/.exec(
        bagInCurrentBag.replace(/ bags?/, '')
      );
      !bagMap.has(currentBag) && bagMap.set(currentBag, []);
      !groups.count && (groups.count = 0);
      bagMap.set(currentBag, [...bagMap.get(currentBag), groups]);
    });
});

const getSumBags = (upperBag) => {
  if (upperBag.count === 0) return 0;

  const bagsInUpperBag = bagMap.get(upperBag.type);
  let sum = 1;
  bagsInUpperBag.forEach((bag) => (sum += bag.count * getSumBags(bag)));

  return sum;
};

const solution2 = () => {
  console.log('Solution 2: ', getSumBags({ count: 1, type: 'shiny gold' }) - 1);
};

solution1();
solution2();
