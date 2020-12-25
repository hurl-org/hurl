#!/usr/bin/env node
import yargs from "yargs/yargs";
import init from "./init";

yargs(process.argv.slice(2))
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
  .version("1.0.0").argv;

export type Handler<T> = (args: T) => void | Promise<void>;
