const _input = await Deno.readTextFile("./input.txt");
const input = _input.split("\n");

type Point = {
  x: number;
  y: number;
};

const sensors: Point[] = [];
const beacons: Point[] = [];

input.forEach((line) => {
  const [A, B] = line
    .replace("Sensor at x=", "")
    .replace(" y=", "")
    .replace(" closest beacon is at x=", "")
    .replace(" y=", "")
    .split(":");
  const [sensorX, sensorY] = A.split(",").map((n) => parseInt(n));
  const [beaconX, beaconY] = B.split(",").map((n) => parseInt(n));

  sensors.push({ x: sensorX, y: sensorY });
  beacons.push({ x: beaconX, y: beaconY });
});

function ManhattanDistance(a: Point, b: Point) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

const distances = new Map();
const min = 0;
const max = 4000000;

for (let i = 0; i < sensors.length; i++) {
  const sensor = sensors[i];
  const beacon = beacons[i];
  const distance = ManhattanDistance(sensor, beacon);
  distances.set(sensor, distance);
}

for (let i = 0; i < sensors.length; i++) {
  const sensor = sensors[i];
  const distance = distances.get(sensor);
  for (let j = 0; j <= distance; j++) {
    const x = sensor.x + distance + 1 - j;
    const y = sensor.y + j;
    if (x >= min && x <= max && y >= min && y <= max) {
      let blocked = false;
      for (let k = 0; k < sensors.length; k++) {
        const sensor2 = sensors[k];
        const distance2 = distances.get(sensor2);
        if (ManhattanDistance({ x: x, y: y }, sensor2) <= distance2) {
          blocked = true;
          break;
        }
      }
      if (!blocked) {
        console.log(x * 4000000 + y);
        Deno.exit(0);
      }
    }
  }
}
