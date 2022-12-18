const _input = await Deno.readTextFile("./input.txt");
const dropletInput = _input.split("\n");

type Cube = {
  x: number;
  y: number;
  z: number;
};

function stringifyCube(cube: Cube) {
  return `${cube.x},${cube.y},${cube.z}`;
}

const cubes = new Map<string, Cube>();

dropletInput.forEach((line) => {
  const [x, y, z] = line.split(",").map((n) => parseInt(n));
  cubes.set(`${x},${y},${z}`, { x, y, z });
});

function _getAdjacents(cube: Cube): Cube[] {
  return [
    { x: cube.x + 1, y: cube.y, z: cube.z },
    { x: cube.x - 1, y: cube.y, z: cube.z },
    { x: cube.x, y: cube.y + 1, z: cube.z },
    { x: cube.x, y: cube.y - 1, z: cube.z },
    { x: cube.x, y: cube.y, z: cube.z + 1 },
    { x: cube.x, y: cube.y, z: cube.z - 1 },
  ];
}

const OUT = new Set<string>();
const IN = new Set<string>();

function reachesOutside(cube: Cube) {
  const key = stringifyCube(cube);
  if (OUT.has(key)) return true;
  if (IN.has(key)) return false;

  const seen = new Map<string, Cube>();
  const queue = [cube];
  while (queue) {
    // Get new current
    const current = queue.shift();

    if (!current) break; // No more adjacents

    const currentKey = stringifyCube(current);

    if (cubes.has(currentKey)) continue; // Skip if current is a lava cube

    // Check if current is in seen
    if (seen.has(currentKey)) continue;
    // Store current in seen
    seen.set(currentKey, current);

    // Fill OUT
    if (seen.size > 3500) {
      for (const c of seen) {
        OUT.add(c[0]);
      }
      return true;
    }

    const adjacents = _getAdjacents(current);
    adjacents.forEach((adj) => {
      queue.push(adj);
    });
  }
  // Fill IN
  for (const c of seen) {
    IN.add(c[0]);
  }
  return false;
}

let count = 0;

cubes.forEach((cube) => {
  _getAdjacents(cube).forEach((adj) => {
    if (reachesOutside(adj)) {
      count++;
    }
  });
});
console.log(count);
