const _input = await Deno.readTextFile("./input.txt");
const inputArray = _input.split("\n");

type pos = {
  x: number;
  y: number;
};

const positions = new Set();
const Head: pos = { x: 0, y: 0 };
const Tail: pos = { x: 0, y: 0 };

function move(x: number, y: number, times: number) {
  for (let i = 0; i < times; i++) {
    Head.x += x;
    Head.y += y;
    if (Math.abs(Head.x - Tail.x) > 1) {
      Tail.x += Head.x - Tail.x > 0 ? 1 : -1;
      if (Head.y != Tail.y) {
        Tail.y += Head.y - Tail.y > 0 ? 1 : -1;
      }
    }
    if (Math.abs(Head.y - Tail.y) > 1) {
      Tail.y += Head.y - Tail.y > 0 ? 1 : -1;
      if (Head.x !== Tail.x) {
        Tail.x += Head.x - Tail.x > 0 ? 1 : -1;
      }
    }
    positions.add(Tail.x + " " + Tail.y);
  }
}

inputArray.forEach((line) => {
  const [direction, length] = line.split(" ");
  switch (direction) {
    case "R":
      move(1, 0, Number(length));
      break;
    case "L":
      move(-1, 0, Number(length));
      break;
    case "U":
      move(0, 1, Number(length));
      break;
    case "D":
      move(0, -1, Number(length));
      break;
    default:
      console.log("Frick");
  }
});

console.log(positions.size);
