// Node
import { join } from "path";
import { writeFile } from "fs/promises";

// Internals
import logger from "../logger";

// Constants
import { DEFAULT_VARIABLES } from "../constants";

// Types
import { ConfigFileContents, Example } from "../types";

const createExampleTemplates = async (
  examples: Example[],
  templatesDir: string,
  config: ConfigFileContents
) => {
  examples.forEach((example) => createTemplate(example, templatesDir, config));
};

const createTemplate = async (
  example: Example,
  templatesDir: string,
  config: ConfigFileContents
) => {
  const file = FILE_NAMES[example];
  const path = join(templatesDir, file);

  const EXAMPLE_VARIABLE = "name";

  const contents =
    `// ${example} Example Template\n\n` +
    FILE_CONTENTS[example](config, EXAMPLE_VARIABLE) +
    `\n\n// Run 'hurl generate -p <path> -t ${file} --${EXAMPLE_VARIABLE}=<${EXAMPLE_VARIABLE}>' to create a new file based on this template\n\n` +
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

type FileContentsCreator = (
  config: ConfigFileContents,
  exampleVar: string
) => string;

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
