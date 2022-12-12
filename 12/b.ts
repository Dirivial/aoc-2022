const _input = await Deno.readTextFile("./input.txt");
const inputArray = _input.split("\n");

type Point = { x: number; y: number };

const grid: number[][] = [];
let start: Point = { x: 0, y: 0 };
let end: Point = { x: 0, y: 0 };

inputArray.forEach((line) => {
  const row: number[] = [];
  line.split("").forEach((char) => {
    const charCode = char.charCodeAt(0);
    if (charCode === 83) {
      row.push(0);
      start = { x: row.length - 1, y: grid.length };
    } else if (charCode === 69) {
      row.push(25);
      end = { x: row.length - 1, y: grid.length };
    } else {
      row.push(charCode % 97);
    }
  });
  grid.push(row);
});

const getPossibleNeighbors = (point: Point, height: number) => {
  const neighbors: Point[] = [];
  const { x, y } = point;
  if (x > 0 && grid[y][x - 1] - height >= -1) {
    neighbors.push({ x: x - 1, y });
  }
  if (x < grid[0].length - 1 && grid[y][x + 1] - height >= -1) {
    neighbors.push({ x: x + 1, y });
  }
  if (y > 0 && grid[y - 1][x] - height >= -1) {
    neighbors.push({ x, y: y - 1 });
  }
  if (y < grid.length - 1 && grid[y + 1][x] - height >= -1) {
    neighbors.push({ x, y: y + 1 });
  }
  return neighbors;
};

function pointToString(point: Point) {
  return `${point.x},${point.y}`;
}

const visited: Set<string> = new Set();
const breadthFirst: Point[][] = [[end]];
visited.add(pointToString(end));

console.log(visited);

while (breadthFirst.length > 0) {
  const currentPath = breadthFirst.shift()!;
  const currentPoint = currentPath[currentPath.length - 1];
  const currentHeight = grid[currentPoint.y][currentPoint.x];
  const neighbors = getPossibleNeighbors(currentPoint, currentHeight);
  neighbors.forEach((neighbor) => {
    const neighborKey = `${neighbor.x},${neighbor.y}`;
    if (grid[neighbor.y][neighbor.x] === 0) {
      console.log(currentPath.length);
      Deno.exit(0);
    }
    if (!visited.has(neighborKey)) {
      visited.add(neighborKey);
      breadthFirst.push([...currentPath, neighbor]);
    }
  });
}
