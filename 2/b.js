const fs = require("fs");

function syncReadFile(filename) {
  const contents = fs.readFileSync(filename, "utf-8");
  return contents;
}

const input = syncReadFile("./input.txt");
const rounds = input.split(/\n/);

function calculateRoundScore(opponent, me) {
  switch (opponent + me) {
    case "AX":
      return 4;
    case "AY":
      return 8;
    case "AZ":
      return 3;
    case "BX":
      return 1;
    case "BY":
      return 5;
    case "BZ":
      return 9;
    case "CX":
      return 7;
    case "CY":
      return 2;
    case "CZ":
      return 6;
  }
}

function findMatch(opponent, result) {
  switch (opponent + result) {
    case "AX":
      return "Z";
    case "AY":
      return "X";
    case "AZ":
      return "Y";
    case "BX":
      return "X";
    case "BY":
      return "Y";
    case "BZ":
      return "Z";
    case "CX":
      return "Y";
    case "CY":
      return "Z";
    case "CZ":
      return "X";
  }
}

let score = 0;

rounds.forEach((round) => {
  const split = round.split(" ");
  const opponent = split[0];
  const result = split[1];
  const me = findMatch(opponent, result);
  score += calculateRoundScore(opponent, me);
});

console.log(score);
