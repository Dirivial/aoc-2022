const _input = await Deno.readTextFile("./input.txt");

const inputArray = _input.split("\n");
const inputStacks = inputArray.splice(0, 10); // Chad hardcoding
inputStacks.pop();

const numberOfStacks = Number(inputStacks.at(-1)?.at(-2));
inputStacks.pop();
inputStacks.reverse();

const stacks = new Array(numberOfStacks);

for (let i = 0; i < numberOfStacks; i++) {
  stacks[i] = [];
}

// Parse stacks, adding any crates to their respective stack - same as part A
inputStacks.forEach((layer) => {
  let j = 0;
  for (let i = 1; i < layer.length; i += 4) {
    if (layer[i] != undefined && layer[i] != " ") {
      stacks.at(j).push(layer[i]);
    }
    j++;
  }
});

// Instructions - This is what changed in part B
inputArray.forEach((instruction) => {
  const [_m, move, _f, from, _t, to] = instruction.split(" ");
  stacks[Number(to) - 1].push(
    ...stacks[Number(from) - 1].splice(-Number(move))
  );
});

// Get the top-most crate of each stack
const ans: string[] = [];
stacks.forEach((stack) => {
  ans.push(stack.at(-1));
});

// copy/paste friendly output
console.log(ans.toString().replaceAll(",", ""));
