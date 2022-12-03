const fs = require("fs");

function syncReadFile(filename) {
  const contents = fs.readFileSync(filename, "utf-8");
  return contents;
}

const input = syncReadFile("./input.txt").split("\n");
const sinput = syncReadFile("./sinput.txt").split("\n");

let sum = 0;

input.forEach((line) => {
  const c1 = line.slice(0, line.length / 2);
  const c2 = line.slice(line.length / 2, line.length);

  const letters = [];

  c1.split("").forEach((character, index) => {
    c2.split("").forEach((char) => {
      if (char == character) {
        if (!letters.includes(c1.charCodeAt(index))) {
          letters.push(c1.charCodeAt(index));
        }
      }
    });
  });
  letters.forEach((letter) => {
    const code = parseInt("" + letter, 10);
    if (code > 91) {
      sum += letter % 96;
    } else {
      sum += (letter % 65) + 27;
    }
  });
});

console.log(sum);
