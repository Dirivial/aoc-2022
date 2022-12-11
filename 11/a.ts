const _input = await Deno.readTextFile("./input.txt");
const inputArray = _input.split("\n\n");

type Monkey = {
  items: number[];
  operation: string;
  operationBy: string;
  divisibleBy: number;
  ifTrue: number;
  ifFalse: number;
  timesInspect: number;
};

const monkeys: Monkey[] = [];

inputArray.forEach((monkey, index) => {
  const lines = monkey.split("\n").map((v) => v.trim());

  monkeys.push({} as Monkey);
  monkeys[index].timesInspect = 0;
  monkeys[index].items = lines[1]
    .split(" ")
    .splice(2)
    .map((v) => v.replace(",", ""))
    .map((v) => Number(v));

  const operation = lines[2].split("= ")[1];
  monkeys[index].operation = operation[4];
  monkeys[index].operationBy = operation.slice(6);

  const divisibleBy = lines[3].split(" ");
  monkeys[index].divisibleBy = Number(divisibleBy[3]);
  monkeys[index].ifTrue = Number(lines[4].split(" ")[5]);
  monkeys[index].ifFalse = Number(lines[5].split(" ")[5]);
});

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => {
    while (monkey.items.length > 0) {
      let result = monkey.items[0];
      switch (monkey.operation) {
        case "+":
          result += Number(
            monkey.operationBy === "old" ? monkey.items[0] : monkey.operationBy
          );
          break;
        case "*":
          result *= Number(
            monkey.operationBy === "old" ? monkey.items[0] : monkey.operationBy
          );
          break;
      }
      result = Math.floor(result / 3);
      result % monkey.divisibleBy === 0
        ? monkeys[monkey.ifTrue].items.push(result)
        : monkeys[monkey.ifFalse].items.push(result);

      monkey.items.shift();
      monkey.timesInspect++;
    }
  });
}

const monkeyBusiness = monkeys.map((v) => v.timesInspect).sort((a, b) => b - a);
console.log(monkeyBusiness);
console.log(monkeyBusiness[0] * monkeyBusiness[1]);
