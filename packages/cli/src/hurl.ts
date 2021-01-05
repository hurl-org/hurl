#!/usr/bin/env node
// Externals
import yargs from "yargs/yargs";

// Internals
import init from "./init";
import generate from "./generate";

yargs(process.argv.slice(2))
  .command(
    ["init", "initialize"],
    "Initialize Hurl",
    (command) => {
      command
        .option("skip", {
          description: "Skip prompts and create default config",
          alias: "s",
          boolean: true,
          default: false,
        })
        .option("examples", {
          description: "Include example templates when creating config",
          alias: "e",
          boolean: true,
          default: true,
        });
    },
    init
  )
  .command(
    "generate",
    "Generate files from a template",
    (command) => {
      command
        .option("paths", {
          description: "The paths to the new files",
          alias: "p",
          demandOption: true,
          array: true,
        })
        .option("template", {
          description: "The name of the template file/folder",
          alias: "t",
          demandOption: true,
          string: true,
        })
        .option("confirm", {
          description: "Should confirm when overriding an existing file",
          boolean: true,
          default: true,
        })
        .strict(false);
    },
    generate
  )
  .showHelpOnFail(true)
  .demandCommand(1, "")
  .recommendCommands()
  .strict()
  .completion("completion", "Generate completion script")
  .version("1.0.0").argv;
