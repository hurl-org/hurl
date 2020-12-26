#!/usr/bin/env node

// Externals
import yargs from "yargs/yargs";

// Internals
import init from "./init";
import generate from "./generate";

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
  .command(
    "generate",
    "Generate a file from a template",
    (command) => {
      command
        .option("path", {
          description: "The path to the new file",
          alias: "p",
          demandOption: true,
          string: true,
        })
        .option("template", {
          description: "The name of the template file",
          alias: "t",
          demandOption: true,
          string: true,
        })
        .strict(false);
    },
    generate
  )
  .showHelpOnFail(true)
  .demandCommand(1, "")
  .recommendCommands()
  .strict()
  .version("1.0.0").argv;
