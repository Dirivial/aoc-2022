const fs = require("fs");

function syncReadFile(filename) {
  const contents = fs.readFileSync(filename, "utf-8");
  return contents;
}

const input = syncReadFile("./input.txt").split("\n");
const sinput = syncReadFile("./sinput.txt").split("\n");

let sum = 0;

input.forEach((line) => {
  const pairs = line.split(",");

  const [lowA, highA] = pairs[0].split("-").map((v) => Number(v));
  const [lowB, highB] = pairs[1].split("-").map((v) => Number(v));

  if (lowA <= lowB && highA >= highB) {
    sum += 1;
  } else if (lowB <= lowA && highB >= highA) {
    sum += 1;
  }
});

console.log(sum);
