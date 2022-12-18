const _input = await Deno.readTextFile("./input.txt");

type Point = {
  x: number;
  y: number;
};

type Piece = {
  origin: Point;
  rockShape: Point[];
  height: number;
  width: number;
};

const chamberWidth = 7;
const directions: boolean[] = [];

_input.split("").forEach((c) => {
  if (c === "<") {
    directions.push(false);
  } else {
    directions.push(true);
  }
});

// Create rock pieces
const pieces: Piece[] = [];
// Long minus
pieces.push({
  origin: { x: 0, y: 0 },
  rockShape: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  height: 1,
  width: 4,
});

// Plus
pieces.push({
  origin: { x: 0, y: 0 },
  rockShape: [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
  ],
  height: 3,
  width: 3,
});

// Backwards L
pieces.push({
  origin: { x: 0, y: 0 },
  rockShape: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
  height: 3,
  width: 3,
});

// I
pieces.push({
  origin: { x: 0, y: 0 },
  rockShape: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
  ],
  height: 4,
  width: 1,
});

// Square
pieces.push({
  origin: { x: 0, y: 0 },
  rockShape: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ],
  height: 2,
  width: 2,
});

const rockChamber: boolean[][] = [];
for (let i = 0; i < chamberWidth; i++) {
  rockChamber.push([]);
}
let highest = 0;
let rockPiece = 0;
let hotGasIndex = 0;

function extendChamber(toExtend: number) {
  for (let i = 0; i < chamberWidth; i++) {
    for (let j = 0; j < toExtend; j++) {
      rockChamber[i].push(false);
    }
  }
}

function collides(origin: Point, piece: Piece) {
  for (let i = 0; i < piece.rockShape.length; i++) {
    const coords: Point = {
      x: origin.x + piece.rockShape[i].x,
      y: origin.y + piece.rockShape[i].y,
    };
    if (rockChamber[coords.x][coords.y]) {
      return true;
    }
  }
  return false;
}

extendChamber(6);

function _printRockChamber() {
  for (let i = rockChamber[0].length - 1; i >= 0; i--) {
    const row = [];
    for (let j = 0; j < rockChamber.length; j++) {
      row.push(rockChamber[j][i]);
    }
    console.log(
      row
        .toString()
        .replaceAll("false", ".")
        .replaceAll("true", "#")
        .replaceAll(",", " ") +
        " " +
        i
    );
  }
  console.log("0 1 2 3 4 5 6\n");
}

// Simulate each rock falling
for (let i = 0; i < 2022; i++) {
  // Origin is two units from the left wall and three units above highest point
  const origin: Point = { x: 2, y: highest + 3 };
  const piece = pieces.at(rockPiece)!;
  rockPiece = (rockPiece + 1) % pieces.length;

  // Extend Chamber
  extendChamber(piece.height);

  while (true) {
    // Rock is pushed
    if (directions[hotGasIndex]) {
      // Right
      if (
        origin.x + piece.width < chamberWidth &&
        !collides({ x: origin.x + 1, y: origin.y }, piece)
      ) {
        origin.x += 1;
      }
    } else {
      // Left
      if (origin.x > 0 && !collides({ x: origin.x - 1, y: origin.y }, piece)) {
        origin.x -= 1;
      }
    }
    hotGasIndex = (hotGasIndex + 1) % (directions.length - 1);

    // Rock falls
    if (collides({ x: origin.x, y: origin.y - 1 }, piece) || origin.y === 0) {
      break;
    } else {
      origin.y -= 1;
    }
  }

  // Rock is no longer falling
  piece.rockShape.forEach((part) => {
    rockChamber[part.x + origin.x][part.y + origin.y] = true;
  });

  // Update tower height
  highest = Math.max(highest, origin.y + piece.height);
}
console.log("");

//printRockChamber();
console.log(highest);
