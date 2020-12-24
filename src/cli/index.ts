#!/usr/bin/env node

import yargs, { Argv } from "yargs";

function add(x: number, y: number) {
  return x + y;
}

const coarseNumber = (text: string) => {
  const value = Number(text);
  if (Number.isFinite(value)) return value;
  throw new Error(`${text} is not a number!`);
};

const builder = (command: Argv) => {
  command
    .positional("firstOperand", {
      describe: "First operand",
      coerce: coarseNumber,
    })
    .positional("secondOperand", {
      describe: "Second operand",
      coerce: coarseNumber,
    });
};

const handler = ({
  firstOperand,
  secondOperand,
}: {
  firstOperand: number;
  secondOperand: number;
}) => console.log(add(firstOperand, secondOperand));

yargs
  .command("* <firstOperand> <secondOperand>", false, builder, handler)
  .parse();
