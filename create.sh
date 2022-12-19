#!/bin/bash

day=${1##+(0)}
if [ -z "${day}" ]; then
  echo "usage: ./$0 day"
  exit
fi

if [ -z "${AOC_SESSION}" ]; then
  echo "You need to set AOC_SESSION. Aborting..."
  exit
fi

echo "Creating folder '$day'"
mkdir $day
cd $day

echo "Creating files"
touch a.ts
touch b.ts
touch test.txt

echo "const _input = Deno.readFileSync('input.txt');" > a.ts
echo "const _input = Deno.readFileSync('input.txt');" > b.ts

echo "Fetching input data"
curl -s "https://adventofcode.com/2022/day/$day/input" --cookie "session=${AOC_SESSION}" -o input.txt

echo "Done."
