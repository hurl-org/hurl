// Externals
import { prompt } from "enquirer";

// Constants
import { ALL_EXAMPLES } from "./constants";
import { ALL_CONFIG_FILES } from "../constants";

// Types
import { InitArgs, InitConfig } from "./types";

const configEnquirer = async (args: InitArgs) => {
  const { examples } = args;

  const questions: Parameters<typeof prompt>[0] = [
    {
      name: "prefix",
      type: "input",
      message: "What should be the prefix for dynamic template variables?",
      initial: "__GATOR__",
    },
    {
      name: "format",
      type: "select",
      message: "What format do you want your config file to be in?",
      initial: 0,
      choices: Object.keys(ALL_CONFIG_FILES).map((format) => ({
        name: format,
      })),
    },
  ];

  if (examples) {
    questions.unshift({
      name: "languages",
      type: "multiselect",
      message: "What languages/frameworks do you want example templates for?",
      initial: 0,
      hint:
        "(Press <space> to select, <a> to toggle all, <i> to invert selection)",
      choices: ALL_EXAMPLES.map((language) => ({ name: language })),
    });
  }

  console.log(); // Empty Line
  const config: InitConfig = await prompt(questions);

  return config;
};

export default configEnquirer;
