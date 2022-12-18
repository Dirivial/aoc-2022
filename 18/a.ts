const _input = await Deno.readTextFile("./input.txt");
const dropletInput = _input.split("\n");

type LavaCube = {
  x: number;
  y: number;
  z: number;
};

const lavaCubes: LavaCube[] = [];

dropletInput.forEach((line) => {
  const [x, y, z] = line.split(",").map((n) => parseInt(n));
  lavaCubes.push({ x, y, z });
});

function getSides(): number {
  //console.log(lavaCubeGroup);
  const blocked: LavaCube[] = [];
  lavaCubes.forEach((lc) => {
    const { x, y, z } = lc;
    lavaCubes.forEach((lavaCube) => {
      if (
        (lavaCube.x === x + 1 && lavaCube.y === y && lavaCube.z === z) ||
        (lavaCube.x === x - 1 && lavaCube.y === y && lavaCube.z === z) ||
        (lavaCube.x === x && lavaCube.y === y + 1 && lavaCube.z === z) ||
        (lavaCube.x === x && lavaCube.y === y - 1 && lavaCube.z === z) ||
        (lavaCube.x === x && lavaCube.y === y && lavaCube.z === z + 1) ||
        (lavaCube.x === x && lavaCube.y === y && lavaCube.z === z - 1)
      ) {
        blocked.push(lavaCube);
      }
    });
  });
  return lavaCubes.length * 6 - blocked.length;
}

console.log(getSides());
