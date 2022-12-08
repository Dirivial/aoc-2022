const _input = await Deno.readTextFile("./input.txt");
const inputArray = _input.split("\n");

const treeGrid: number[][] = [];

inputArray.forEach((line, index) => {
  treeGrid.push([]);
  treeGrid[index].push(...line.split("").map((v) => Number(v)));
});

function isVisible(x: number, y: number) {
  const treeHeight = treeGrid[y][x];

  const right = treeGrid[y].slice(x + 1).some((v) => v >= treeHeight);
  const left = treeGrid[y].slice(0, x).some((v) => v >= treeHeight);

  const up = treeGrid.slice(y + 1).some((v) => v[x] >= treeHeight);
  const down = treeGrid.slice(0, y).some((v) => v[x] >= treeHeight);

  return !right || !left || !up || !down;
}

let sum = 0;
for (let x = 1; x < treeGrid.length - 1; x++) {
  for (let y = 1; y < treeGrid.length - 1; y++) {
    if (isVisible(x, y)) {
      sum++;
    }
  }
}

console.log(sum + treeGrid[0].length * 2 + treeGrid.length * 2 - 4);
