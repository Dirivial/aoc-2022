const _input = await Deno.readTextFile("./input.txt");

const input = _input.split("\n")[0].split("");
const lastCharacters: string[] = [];

const charactersToCheck = 14;
lastCharacters.push(...input.splice(0, charactersToCheck - 1));

function allDistinct(characters: string[]) {
  const copy = characters.toString();
  let distinct = true;
  characters.forEach((c) => {
    const thing = copy.split(c);
    if (thing.length > 2) {
      distinct = false;
    }
  });
  return distinct;
}

for (let i = 0; i < input.length; i++) {
  const c = input[i];
  lastCharacters.push(c);
  if (!allDistinct(lastCharacters)) {
    lastCharacters.splice(0, 1);
  } else {
    console.log(
      c + "," + lastCharacters.toString() + " index: " + (i + charactersToCheck)
    );
    i = input.length;
  }
}
