const fs = require("fs");

function syncReadFile(filename) {
  const contents = fs.readFileSync(filename, "utf-8");
  return contents;
}

const input = syncReadFile("./input.txt");
const splitData = input.split(/\n\n/).map((value) => {
  return value.split(/\n/);
});

let highestCalorieIndex = 0;
let highestCalorie = 0;

splitData.forEach((item, index) => {
  const sum = item.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue),
    0
  );
  if (sum > highestCalorie) {
    highestCalorie = sum;
    highestCalorieIndex = index;
  }
});

console.log(highestCalorie);
