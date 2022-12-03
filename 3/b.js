const fs = require("fs");

function syncReadFile(filename) {
  const contents = fs.readFileSync(filename, "utf-8");
  return contents;
}

const input = syncReadFile("./input.txt").split("\n");
const sinput = syncReadFile("./sinput.txt").split("\n");

let sum = 0;

for (let i = 0; i < input.length; i += 3) {
  let letter = 0;
  const c1 = input[i];
  const c2 = input[i + 1];
  const c3 = input[i + 2];

  c1.split("").forEach((character, index) => {
    const s = new String(character);
    if (c2.indexOf(s) != -1 && c3.indexOf(s) != -1) {
      letter = c1.charCodeAt(index);
    }
  });

  if (letter > 91) {
    sum += letter % 96;
  } else {
    sum += (letter % 65) + 27;
  }
}

console.log(sum);
