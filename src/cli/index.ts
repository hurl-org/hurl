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
      command.option("examples", {
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
    "Generate a file from a template",
    (command) => {
      command
        .option("paths", {
          description: "The paths of the new files",
          alias: "p",
          demandOption: true,
          array: true,
        })
        .option("template", {
          description: "The name of the template file",
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
  .version("1.0.0").argv;
