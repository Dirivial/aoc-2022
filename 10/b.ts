const _input = await Deno.readTextFile("./input.txt");
const inputArray = _input.split("\n");

let cycle = 1;
const CRT: string[] = [];
let registerX = 1;

function performCycle() {
  const index = (cycle - 1) % 40;
  if (cycle % 40 === 1 && cycle > 1) {
    CRT.push("\n");
  }
  if (
    index === registerX - 1 ||
    index === registerX ||
    index === registerX + 1
  ) {
    CRT.push("#");
  } else {
    CRT.push(".");
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

console.log(CRT.toString().replaceAll(",", ""));
