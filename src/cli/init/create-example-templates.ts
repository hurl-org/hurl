// Node
import { join } from "path";
import { mkdir, writeFile } from "../utils";

// Internals
import { logger } from "../utils";

// Constants
import { TEMPLATES_PATH } from "../constants";

// Types
import { InitConfig, Language } from "./types";

const createExampleTemplates = async (config: InitConfig) => {
  await mkdir(TEMPLATES_PATH);
  config.languages.forEach((language) => createTemplate(language, config));
};

const createTemplate = async (language: Language, config: InitConfig) => {
  const file = FILE_NAMES[language];
  const path = join(TEMPLATES_PATH, file);

  const EXAMPLE_VARIABLE = "name";

  const contents =
    `// ${language} Example Template\n\n` +
    FILE_CONTENTS[language](config, EXAMPLE_VARIABLE) +
    `\n\n// Run 'gator generate -p <path> -t ${file} --${EXAMPLE_VARIABLE}=<${EXAMPLE_VARIABLE}>' to create a new file based on this template`;

  await writeFile(path, contents);

  logger.success(
    `Created ${language} example template!`,
    ` View: ${process.cwd() + "/" + path}`
  );
};

const FILE_NAMES: Record<Language, string> = {
  JavaScript: "javascript-example.js",
  TypeScript: "typescript-example.ts",
  "React (JavaScript)": "react-javascript-example.jsx",
  "React (TypeScript)": "react-typescript-example.tsx",
};

type FileContentsCreator = (config: InitConfig, exampleVar: string) => string;

const FILE_CONTENTS: Record<Language, FileContentsCreator> = {
  JavaScript: ({ prefix }, exampleVar) =>
    `const example = 'Hello ${prefix}${exampleVar}!';`,
  TypeScript: ({ prefix }, exampleVar) =>
    `const typed: string = 'Goodbye ${prefix}${exampleVar}!';`,
  "React (JavaScript)": ({ prefix }, exampleVar) =>
    "import React from 'react';\n\n" +
    "// The file name is supplied automatically when generating a file from a template\n" +
    `const ${prefix}FILE_NAME = () => {\n` +
    `  return <h1>Hello ${prefix}${exampleVar}</h1>;\n` +
    "};",
  "React (TypeScript)": ({ prefix }, exampleVar) =>
    "import React from 'react';\n\n" +
    "// The file name is supplied automatically when generating a file from a template\n" +
    `const ${prefix}FILE_NAME: React.FC = () => {\n` +
    `  return <h1>Hello ${prefix}${exampleVar}</h1>;\n` +
    "};",
};

export default createExampleTemplates;
