#!/usr/bin/env node

import yargs from "yargs";
import init from "./init";

yargs
  .command(
    ["init", "initialize"],
    "Initialize Gator",
    (command) => {
      command.option("skip", {
        description: "Skip questionnare and create default config",
        alias: "s",
        boolean: true,
        default: false,
      });
    },
    init
  )
  .showHelpOnFail(true)
  .demandCommand(1, "")
  .recommendCommands()
  .strict()
  .version("1.0.0")
  .parse();

export type Handler<T> = (args: T) => void | Promise<void>;

// function add(x: number, y: number) {
//   return x + y;
// }

// const coarseNumber = (text: string) => {
//   const value = Number(text);
//   if (Number.isFinite(value)) return value;
//   throw new Error(`${text} is not a number!`);
// };

// const builder = (command: Argv) => {
//   command
//     .positional("firstOperand", {
//       describe: "First operand",
//       coerce: coarseNumber,
//     })
//     .positional("secondOperand", {
//       describe: "Second operand",
//       coerce: coarseNumber,
//     });
// };

// const handler = ({
//   firstOperand,
//   secondOperand,
// }: {
//   firstOperand: number;
//   secondOperand: number;
// }) => console.log(add(firstOperand, secondOperand));

// yargs
//   .command("* <firstOperand> <secondOperand>", false, builder, handler)
//   .parse();
