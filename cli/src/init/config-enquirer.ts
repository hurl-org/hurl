// Externals
import { prompt } from "enquirer";

// Constants
import { ALL_EXAMPLES } from "./constants";
import { ALL_CONFIG_FILES } from "../constants";

// Types
import { Example, InitArgs } from "./types";
import { ConfigFileFormat } from "../types";

interface PromptResults {
  prefix: string;
  format: ConfigFileFormat;
  examples?: Example[];
}

const configEnquirer = async (args: InitArgs) => {
  const { examples } = args;

  const questions: Parameters<typeof prompt>[0] = [
    {
      name: "prefix",
      type: "input",
      message: "What should be the prefix for dynamic template variables?",
      initial: "__HURL__",
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
      name: "examples",
      type: "multiselect",
      message: "What languages/frameworks do you want example templates for?",
      initial: 0,
      hint:
        "(Press <space> to select, <a> to toggle all, <i> to invert selection)",
      choices: ALL_EXAMPLES.map((language) => ({ name: language })),
    });
  }

  console.log(); // Empty Line
  const config = await prompt<PromptResults>(questions);

  return config;
};

export default configEnquirer;
