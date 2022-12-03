const fs = require("fs");

function syncReadFile(filename) {
  const contents = fs.readFileSync(filename, "utf-8");
  return contents;
}

const input = syncReadFile("./input.txt").split("\n");
const sinput = syncReadFile("./sinput.txt").split("\n");

let sum = 0;
let lines = [];

input.forEach((line) => {
  if (lines.length < 2) {
    lines.push(line);
    return;
  }
  const letters = [];
  const c1 = lines[0];
  const c2 = lines[1];
  const c3 = line;

  c1.split("").forEach((character, index) => {
    c2.split("").forEach((char) => {
      if (char == character) {
        c3.split("").forEach((ch) => {
          if (ch == character) {
            if (!letters.includes(c1.charCodeAt(index))) {
              letters.push(c1.charCodeAt(index));
            }
          }
        });
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
  lines = [];
});

console.log(sum);
