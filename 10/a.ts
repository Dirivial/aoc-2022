const _input = await Deno.readTextFile("./input.txt");
const inputArray = _input.split("\n");

let cycle = 1;
let signalStrength = 0;
let registerX = 1;

function performCycle() {
  if ((cycle - 20) % 40 === 0) {
    signalStrength += registerX * cycle;
  }
  cycle++;
}

inputArray.forEach((line) => {
  if (line.startsWith("noop")) {
    performCycle();
  } else {
    const [_addx, V] = line.split(" ");
    performCycle();
    performCycle();
    registerX += Number(V);
  }
});

console.log(signalStrength);
