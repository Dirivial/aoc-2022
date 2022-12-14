const _input = await Deno.readTextFile("./input.txt");
const input = _input.split("\n");

type Rock = {
  x: number;
  y: number;
};

const points = new Set();
let maxDepth = 0;

input.forEach((line) => {
  // Create rocks
  const path: Rock[] = line.split(" -> ").map((rock) => {
    const [x, y] = rock.split(",");
    return { x: parseInt(x), y: parseInt(y) };
  });
  // Fill in gaps between rocks
  for (let i = 1; i < path.length; i++) {
    const start = path[i - 1];
    const end = path[i];
    if (start.x === end.x) {
      // Update max depth
      if (start.y > maxDepth) maxDepth = start.y;
      // Add rocks
      for (
        let y = Math.min(start.y, end.y);
        y <= Math.max(start.y, end.y);
        y++
      ) {
        points.add(`${start.x},${y}`);
      }
    } else {
      // Update max depth
      if (start.y > maxDepth) maxDepth = start.y;
      if (end.y > maxDepth) maxDepth = end.y;
      // Add rocks
      for (
        let x = Math.min(start.x, end.x);
        x <= Math.max(start.x, end.x);
        x++
      ) {
        points.add(`${x},${start.y}`);
      }
    }
  }
});

const sand = new Set();

function fillSand(x: number, y: number) {
  // Stop if we hit a rock or the "bottom" or already filled sand
  if (points.has(`${x},${y}`)) return;
  if (y > maxDepth) {
    console.log(sand.size);
    Deno.exit();
  }
  if (sand.has(`${x},${y}`)) return;
  // Let sand go down
  fillSand(x, y + 1);
  fillSand(x - 1, y + 1);
  fillSand(x + 1, y + 1);
  // Important to add after recursion, the sand below needs to rest first
  sand.add(`${x},${y}`);
}
fillSand(500, 0);
