const _input = await Deno.readTextFile("./input.txt");
const dropletInput = _input.split("\n");

/* NOTE this only works on the test input at the moment */

type LavaCube = {
  x: number;
  y: number;
  z: number;
};

type AirPocket = {
  blocks: LavaCube[];
};

const lavaCubes: LavaCube[] = [];

dropletInput.forEach((line) => {
  const [x, y, z] = line.split(",").map((n) => parseInt(n));
  lavaCubes.push({ x, y, z });
});

const airBlocks: Set<string> = new Set();

function getSidesGreedy(): number {
  //console.log(lavaCubeGroup);
  const blocked: LavaCube[] = [];
  lavaCubes.forEach((lc) => {
    const { x, y, z } = lc;
    for (let i = -1; i <= 1; i += 2) {
      airBlocks.add(`${x + i},${y},${z}`);
      airBlocks.add(`${x},${y + i},${z}`);
      airBlocks.add(`${x},${y},${z + i}`);
    }
    let blockedSides = 0;
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
        blockedSides++;
      }
    });
    if (blockedSides > 0) {
      blocked.slice(-blockedSides).forEach((airCube) => {
        airBlocks.delete(`${airCube.x},${airCube.y},${airCube.z}`);
      });
    }
  });
  return lavaCubes.length * 6 - blocked.length;
}

const lavaCubeSides = getSidesGreedy();

const airPockets: AirPocket[] = [];
const airArray = Array.from(airBlocks);

while (true) {
  // Get the next air pocket
  const airBlocksLeft: LavaCube[] = [];
  const airBlock = airArray.shift();
  if (airBlock === undefined) break;
  const [x, y, z] = airBlock.split(",").map((n) => parseInt(n));
  airBlocksLeft.push({ x, y, z });

  // If there is no next air pocket, we are done
  if (airBlocksLeft[0] === undefined) {
    break;
  }

  // Create a new air pocket
  const airPocket = new Set<LavaCube>();

  // Fill the air pocket with more air blocks
  while (airBlocksLeft.length > 0) {
    const airBlock = airBlocksLeft.shift();
    if (airBlock === undefined) {
      break;
    }
    airPocket.add(airBlock);
    for (let i = -1; i <= 1; i += 2) {
      const newAirBlock = { x: airBlock.x + i, y: airBlock.y, z: airBlock.z };
      const str = `${newAirBlock.x},${newAirBlock.y},${newAirBlock.z}`;
      if (!airPocket.has(newAirBlock)) {
        if (airBlocks.has(str)) {
          airBlocksLeft.push(newAirBlock);
          airBlocks.delete(str);
        }
      }
      const newAirBlock2 = { x: airBlock.x, y: airBlock.y + i, z: airBlock.z };
      const str2 = `${newAirBlock2.x},${newAirBlock2.y},${newAirBlock2.z}`;
      if (!airPocket.has(newAirBlock2) && airBlocks.has(str2)) {
        airBlocksLeft.push(newAirBlock2);
        airBlocks.delete(str2);
      }

      const newAirBlock3 = { x: airBlock.x, y: airBlock.y, z: airBlock.z + i };
      const str3 = `${newAirBlock3.x},${newAirBlock3.y},${newAirBlock3.z}`;
      if (!airPocket.has(newAirBlock3) && airBlocks.has(str3)) {
        airBlocksLeft.push(newAirBlock3);
        airBlocks.delete(str3);
      }
    }
  }
  airPockets.push({ blocks: Array.from(airPocket) });
}
const failedAirPockets: number[] = [];

airPockets.forEach((airPocket, index) => {
  // Make sure the air pocket is fully touching the lava
  let touching = true;
  airPocket.blocks.forEach((airBlock) => {
    for (let i = -1; i <= 1; i += 2) {
      const newAirBlock = { x: airBlock.x + i, y: airBlock.y, z: airBlock.z };
      const str = `${newAirBlock.x},${newAirBlock.y},${newAirBlock.z}`;
      if (
        !airBlocks.has(str) &&
        !lavaCubes.some(
          (lc) =>
            lc.x === newAirBlock.x &&
            lc.y === newAirBlock.y &&
            lc.z === newAirBlock.z
        )
      ) {
        touching = false;
      }
      const newAirBlock2 = { x: airBlock.x, y: airBlock.y + i, z: airBlock.z };
      const str2 = `${newAirBlock2.x},${newAirBlock2.y},${newAirBlock2.z}`;
      if (
        airBlocks.has(str2) &&
        !lavaCubes.some(
          (lc) =>
            lc.x === newAirBlock2.x &&
            lc.y === newAirBlock2.y &&
            lc.z === newAirBlock2.z
        )
      ) {
        touching = false;
      }

      const newAirBlock3 = { x: airBlock.x, y: airBlock.y, z: airBlock.z + i };
      const str3 = `${newAirBlock3.x},${newAirBlock3.y},${newAirBlock3.z}`;
      if (
        airBlocks.has(str3) &&
        !lavaCubes.some(
          (lc) =>
            lc.x === newAirBlock3.x &&
            lc.y === newAirBlock3.y &&
            lc.z === newAirBlock3.z
        )
      ) {
        touching = false;
      }
    }
  });
  if (!touching) {
    failedAirPockets.push(index);
  }
});

// Get the legal air pockets (the ones that are fully touching the lava)
const legalAirPockets = airPockets.filter(
  (_v, index) => !failedAirPockets.includes(index)
);

function getAirSides() {
  let totalSides = 0;
  legalAirPockets.forEach((airPocket) => {
    const blocked: LavaCube[] = [];
    airPocket.blocks.forEach((airBlock) => {
      const { x, y, z } = airBlock;
      if (
        (airBlock.x === x + 1 && airBlock.y === y && airBlock.z === z) ||
        (airBlock.x === x - 1 && airBlock.y === y && airBlock.z === z) ||
        (airBlock.x === x && airBlock.y === y + 1 && airBlock.z === z) ||
        (airBlock.x === x && airBlock.y === y - 1 && airBlock.z === z) ||
        (airBlock.x === x && airBlock.y === y && airBlock.z === z + 1) ||
        (airBlock.x === x && airBlock.y === y && airBlock.z === z - 1)
      ) {
        blocked.push(airBlock);
      }
    });
    totalSides += airPocket.blocks.length * 6 - blocked.length;
  });
  return totalSides;
}

console.log(lavaCubeSides - getAirSides());
