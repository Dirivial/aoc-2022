const input = await Deno.readTextFile("./input.txt");

let sum = 0;

input.split("\n").forEach((line) => {
  const pairs = line.split(",");

  const [lowA, highA] = pairs[0].split("-").map((v) => Number(v));
  const [lowB, highB] = pairs[1].split("-").map((v) => Number(v));

  if (lowA <= lowB && highA >= highB) {
    sum += 1;
  } else if (lowB <= lowA && highB >= highA) {
    sum += 1;
  }
});

console.log(sum);
