// Externals
import { prompt } from "enquirer";

// Types
import { Config, Format, Language } from "./index";

const configEnquirer = async () => {
  const config: Config = await prompt([
    {
      name: "languages",
      type: "multiselect",
      message: "What languages/frameworks do you wish to create templates for?",
      initial: 0,
      hint:
        "(Press <space> to select, <a> to toggle all, <i> to invert selection)",
      choices: Object.values(Language).map((language) => ({ name: language })),
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
      choices: Object.values(Format).map((format) => ({ name: format })),
    },
  ]);

  return config;
};

export default configEnquirer;
