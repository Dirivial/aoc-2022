const _input = await Deno.readTextFile("./input.txt");
const groups = _input.split("\n\n");

type Group = number | number[];
type BigGroup = Group | Group[];
type Pair = {
  left: BigGroup[];
  right: BigGroup[];
};
const pairs: Pair[] = [];

// Create pairs from the input groups
groups.forEach((group) => {
  const answers = group.split("\n");
  const pair = {
    left: JSON.parse(answers[0]) as BigGroup[],
    right: JSON.parse(answers[1]) as BigGroup[],
  };
  pairs.push(pair);
});

// Create an array from a number if it's not already an array
function createArray(group: BigGroup) {
  return Array.isArray(group) ? group : [group];
}

// Check if the values in the big groups are in the right order
function comparePair(left: BigGroup, right: BigGroup): boolean | undefined {
  if (Array.isArray(left) && Array.isArray(right)) {
    // Both are arrays, so iterate through them and compare each pair of values
    for (let i = 0; i < left.length && i < right.length; i++) {
      const result = comparePair(left[i], right[i]);
      if (result !== undefined) {
        return result;
      }
    }
    // All values are equal (or both arrays are empty)
    if (left.length > right.length) return false;
    if (left.length < right.length) return true;

    // Continue to the next pair of values
    return undefined;
  } else if (typeof left === "number" && typeof right === "number") {
    // Both are numbers
    if (left > right) return false;
    if (left < right) return true;

    // Continue to the next pair of values
    return undefined;
  } else {
    // One is an array and the other is a number
    return comparePair(createArray(left), createArray(right));
  }
}

// Flatten the array of pairs into a single array, add the two decoder keys, and sort it all
const sortedArray = [
  ...pairs.map((pair) => [pair.left, pair.right]).flat(1),
  [[2]] as BigGroup[],
  [[6]] as BigGroup[],
].sort((left, right) =>
  comparePair(left as BigGroup, right as BigGroup) ? -1 : 1
);

let key = 1;
key *= sortedArray.findIndex((item) => JSON.stringify(item) === "[[2]]") + 1;
key *= sortedArray.findIndex((item) => JSON.stringify(item) === "[[6]]") + 1;

console.log(key);
