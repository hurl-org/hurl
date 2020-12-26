// Externals
import { prompt } from "enquirer";

// Constants
import { ALL_LANGUAGES } from "./constants";
import { ALL_CONFIG_FILES } from "../constants";

// Types
import { InitConfig } from "./types";

const configEnquirer = async () => {
  console.log(); // Empty Line
  const config: InitConfig = await prompt([
    {
      name: "languages",
      type: "multiselect",
      message: "What languages/frameworks do you want to create templates for?",
      initial: 0,
      hint:
        "(Press <space> to select, <a> to toggle all, <i> to invert selection)",
      choices: ALL_LANGUAGES.map((language) => ({ name: language })),
    },
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
  ]);

  return config;
};

export default configEnquirer;
