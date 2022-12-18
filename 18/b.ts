const _input = await Deno.readTextFile("./input.txt");
const dropletInput = _input.split("\n");

type Cube = {
  x: number;
  y: number;
  z: number;
};

const lavaCubes: Cube[] = [];

dropletInput.forEach((line) => {
  const [x, y, z] = line.split(",").map((n) => parseInt(n));
  lavaCubes.push({ x, y, z });
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

// Find all cubes with water next to them
