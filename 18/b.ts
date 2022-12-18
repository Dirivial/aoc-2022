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
