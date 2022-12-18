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

const blocked = new Set();
const height = 2000000;

for (let i = 0; i < sensors.length; i++) {
  const sensor = sensors[i];
  const beacon = beacons[i];
  const distance = ManhattanDistance(sensor, beacon);
  if (sensor.y + distance >= height) {
    for (let x = 0; true; x++) {
      if (
        ManhattanDistance(sensor, { x: sensor.x + x, y: height }) > distance
      ) {
        break;
      }
      blocked.add(`${sensor.x + x},${height}`);
    }
    for (let x = -1; true; x--) {
      if (
        ManhattanDistance(sensor, { x: sensor.x + x, y: height }) > distance
      ) {
        break;
      }
      blocked.add(`${sensor.x + x},${height}`);
    }
  }
}

beacons.forEach((beacon) => {
  if (beacon.y === height && blocked.has(`${beacon.x},${beacon.y}`))
    blocked.delete(`${beacon.x},${beacon.y}`);
});
console.log(blocked.size);
