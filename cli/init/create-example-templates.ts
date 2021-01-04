// Node
import { join } from "path";
import { writeFile } from "../utils";

// Internals
import { logger } from "../utils";

// Constants
import { DEFAULT_VARIABLES, TEMPLATES_PATH } from "../constants";

// Types
import { InitConfig, Example } from "./types";

const createExampleTemplates = async (config: InitConfig) => {
  config.examples!.forEach((example) => createTemplate(example, config));
};

const createTemplate = async (example: Example, config: InitConfig) => {
  const file = FILE_NAMES[example];
  const path = join(TEMPLATES_PATH, file);

  const EXAMPLE_VARIABLE = "name";

  const contents =
    `// ${example} Example Template\n\n` +
    FILE_CONTENTS[example](config, EXAMPLE_VARIABLE) +
    `\n\n// Run 'gator generate -p <path> -t ${file} --${EXAMPLE_VARIABLE}=<${EXAMPLE_VARIABLE}>' to create a new file based on this template\n\n` +
    "/** Here's a full list of default variables:\n" +
    " *\n" +
    DEFAULT_VARIABLES.map((d) => ` * ${d}`).join("\n") +
    "\n *\n" +
    " */";

  await writeFile(path, contents);

  logger.success(`Created ${example} example template!`, `View: ${path}`);
};

const FILE_NAMES: Record<Example, string> = {
  JavaScript: "javascript-example.js",
  TypeScript: "typescript-example.ts",
  "React (JavaScript)": "react-javascript-example.jsx",
  "React (TypeScript)": "react-typescript-example.tsx",
};

type FileContentsCreator = (config: InitConfig, exampleVar: string) => string;

const FILE_CONTENTS: Record<Example, FileContentsCreator> = {
  JavaScript: ({ prefix }, exampleVar) =>
    `const example = 'Hello ${prefix}${exampleVar}!';`,
  TypeScript: ({ prefix }, exampleVar) =>
    `const typed: string = 'Goodbye ${prefix}${exampleVar}!';`,
  "React (JavaScript)": ({ prefix }, exampleVar) =>
    "import React from 'react';\n\n" +
    `const ${prefix}FILE_NAME_WITHOUT_EXTENSION = () => {\n` +
    `  return <h1>Hello ${prefix}${exampleVar}</h1>;\n` +
    "};",
  "React (TypeScript)": ({ prefix }, exampleVar) =>
    "import React from 'react';\n\n" +
    `const ${prefix}FILE_NAME_WITHOUT_EXTENSION: React.FC = () => {\n` +
    `  return <h1>Hello ${prefix}${exampleVar}</h1>;\n` +
    "};",
};

export default createExampleTemplates;
