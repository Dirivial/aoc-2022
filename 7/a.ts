const _input = await Deno.readTextFile("./input.txt");
const inputArray = _input.split("\n");

type directory = {
  parent?: directory;
  files: { [fileName: string]: number };
  subdirs: { [dirName: string]: directory };
};

const fileTree: directory = { files: {}, subdirs: {} };
let currentDirectory: directory = fileTree;

function changeDir(dir: string) {
  if (dir == "/") {
    currentDirectory = fileTree;
  } else if (dir == "..") {
    currentDirectory = currentDirectory.parent!;
  } else {
    if (!currentDirectory.subdirs[dir]) {
      currentDirectory.subdirs[dir] = {
        parent: currentDirectory,
        files: {},
        subdirs: {},
      };
    }
    currentDirectory = currentDirectory.subdirs[dir];
  }
}

inputArray.forEach((line) => {
  // Check if its a command
  if (line.startsWith("$ cd")) {
    changeDir(line.substring(5));
  } else {
    const sizeOfFile = line.match(/[0-9]+/);
    if (sizeOfFile) {
      const fileName = line.split(" ")[1];
      currentDirectory.files[fileName] = Number(sizeOfFile);
    }
  }
});

console.log(fileTree);
let smallSum = 0;
function calculateDirectorySize(dir: directory) {
  let sum = 0;

  for (const file in dir.files) {
    sum += dir.files[file];
  }

  for (const subdir in dir.subdirs) {
    const subdirSize = calculateDirectorySize(dir.subdirs[subdir]);
    sum += subdirSize;
    if (subdirSize <= 100000) {
      smallSum += subdirSize;
    }
  }

  return sum;
}

console.log("FileTree size: " + calculateDirectorySize(fileTree));
console.log(smallSum);
