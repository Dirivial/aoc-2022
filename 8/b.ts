const _input = await Deno.readTextFile("./input.txt");
const inputArray = _input.split("\n");

const treeGrid: number[][] = [];

inputArray.forEach((line, index) => {
  treeGrid.push([]);
  treeGrid[index].push(...line.split("").map((v) => Number(v)));
});

function treeScore(x: number, y: number) {
  const treeHeight = treeGrid[y][x];

  const right = treeGrid[y].slice(x + 1).findIndex((v) => v >= treeHeight) + 1;
  const left =
    treeGrid[y]
      .slice(0, x)
      .reverse()
      .findIndex((v) => v >= treeHeight) + 1;

  const down = treeGrid.slice(y + 1).findIndex((v) => v[x] >= treeHeight) + 1;
  const up =
    treeGrid
      .slice(0, y)
      .reverse()
      .findIndex((v) => v[x] >= treeHeight) + 1;

  const a = right ? right : treeGrid[0].length - x - 1;
  const b = down ? down : treeGrid.length - y - 1;

  return a * b * (left ? left : x) * (up ? up : y);
}

const scores = [];
for (let x = 1; x < treeGrid.length - 1; x++) {
  for (let y = 1; y < treeGrid.length - 1; y++) {
    scores.push(treeScore(x, y));
  }
}

console.log(scores.sort((a, b) => b - a)[0]);
