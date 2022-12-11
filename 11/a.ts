const _input = await Deno.readTextFile("./input.txt");
const inputArray = _input.split("\n\n");

type Monkey = {
  name: number;
  items: number[];
  operation: string;
  operationBy: string;
  test: number;
  ifTrue: number;
  ifFalse: number;
  timesInspect: number;
};

const monkeys: Monkey[] = [];

inputArray.forEach((monkey, index) => {
  monkeys.push({} as Monkey);
  monkeys[index].timesInspect = 0;
  monkey.split("\n").forEach((line) => {
    if (line.match("Monkey")) {
      monkeys[index].name = Number(line.split(" ")[1]);
    } else if (line.match("items")) {
      monkeys[index].items = line
        .trim()
        .split(" ")
        .splice(2)
        .map((v) => v.replace(",", ""))
        .map((v) => Number(v));
    } else if (line.match("Operation")) {
      const operation = line.split("= ")[1];
      monkeys[index].operation = operation[4];
      monkeys[index].operationBy = operation.slice(6);
    } else if (line.match("Test")) {
      const test = line.trim().split(" ");
      monkeys[index].test = Number(test[3]);
    } else if (line.match("true")) {
      monkeys[index].ifTrue = Number(line.trim().split(" ")[5]);
    } else if (line.match("false")) {
      monkeys[index].ifFalse = Number(line.trim().split(" ")[5]);
    }
  });
});

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => {
    while (monkey.items.length > 0) {
      let result = 0;
      switch (monkey.operation) {
        case "+":
          result =
            monkey.items[0] +
            Number(
              monkey.operationBy === "old"
                ? monkey.items[0]
                : monkey.operationBy
            );
          break;
        case "-":
          result =
            monkey.items[0] -
            Number(
              monkey.operationBy === "old"
                ? monkey.items[0]
                : monkey.operationBy
            );
          break;
        case "*":
          result =
            monkey.items[0] *
            Number(
              monkey.operationBy === "old"
                ? monkey.items[0]
                : monkey.operationBy
            );
          break;
        case "/":
          result =
            monkey.items[0] /
            Number(
              monkey.operationBy === "old"
                ? monkey.items[0]
                : monkey.operationBy
            );
          break;
      }
      result = Math.floor(result / 3);
      if (result % monkey.test === 0) {
        monkeys[monkey.ifTrue].items.push(result);
      } else {
        monkeys[monkey.ifFalse].items.push(result);
      }
      monkey.items.shift();
      monkey.timesInspect++;
    }
  });
}

const monkeyBusiness = monkeys.map((v) => v.timesInspect).sort((a, b) => b - a);
console.log(monkeyBusiness[0] * monkeyBusiness[1]);
