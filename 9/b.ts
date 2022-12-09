const _input = await Deno.readTextFile("./input.txt");
const inputArray = _input.split("\n");

type pos = {
  x: number;
  y: number;
};

const positions = new Set();
const Head: pos = { x: 0, y: 0 };
const Tail: pos[] = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

function move(x: number, y: number, times: number) {
  for (let i = 0; i < times; i++) {
    Head.x += x;
    Head.y += y;
    if (Math.abs(Head.x - Tail[0].x) > 1) {
      Tail[0].x += Head.x - Tail[0].x > 0 ? 1 : -1;
      if (Head.y != Tail[0].y) {
        Tail[0].y += Head.y - Tail[0].y > 0 ? 1 : -1;
      }
      MoveTail();
    }
    if (Math.abs(Head.y - Tail[0].y) > 1) {
      Tail[0].y += Head.y - Tail[0].y > 0 ? 1 : -1;
      if (Head.x !== Tail[0].x) {
        Tail[0].x += Head.x - Tail[0].x > 0 ? 1 : -1;
      }
      MoveTail();
    }
    positions.add(Tail[8].x + " " + Tail[8].y);
  }
}

function MoveTail() {
  for (let j = 1; j < Tail.length; j++) {
    if (Math.abs(Tail[j - 1].x - Tail[j].x) > 1) {
      Tail[j].x += Tail[j - 1].x - Tail[j].x > 0 ? 1 : -1;
      if (Tail[j].y != Tail[j - 1].y) {
        Tail[j].y += Tail[j - 1].y - Tail[j].y > 0 ? 1 : -1;
      }
    }
    if (Math.abs(Tail[j - 1].y - Tail[j].y) > 1) {
      Tail[j].y += Tail[j - 1].y - Tail[j].y > 0 ? 1 : -1;
      if (Tail[j].x !== Tail[j - 1].x) {
        Tail[j].x += Tail[j - 1].x - Tail[j].x > 0 ? 1 : -1;
      }
    }
    if (j === Tail.length - 1 && Tail.length < 9) {
      Tail.push({ x: 0, y: 0 });
    }
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
