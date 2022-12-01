const fs = require("fs");

function syncReadFile(filename) {
  const contents = fs.readFileSync(filename, "utf-8");
  return contents;
}

const input = syncReadFile("./input.txt");
const splitData = input.split(/\n\n/).map((value) => {
  return value.split(/\n/);
});

let values = [0, 0, 0];

splitData.forEach((item) => {
  const sum = item.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue),
    0
  );
  if (sum > values[0]) {
    values[0] = sum;
    values.sort((a, b) => a - b);
  }
});

console.log("values: ", values);
console.log("Sum: ", values[0] + values[1] + values[2]);
