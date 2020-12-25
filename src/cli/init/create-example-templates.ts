// Node
import { join } from "path";
import { mkdir, writeFile } from "../utils";

// Internals
import { logger } from "../utils";

// Types
import { Config } from "./types";

const createExampleTemplates = async (config: Config) => {
  await mkdir(join(".gator", "templates"));
  config.languages.forEach((language) => {
    switch (language) {
      case "JavaScript": {
        createJavaScriptExampleTemplate(config);
        break;
      }
      case "TypeScript": {
        createTypeScriptExampleTemplate(config);
        break;
      }
      case "React (JavaScript)": {
        createReactJavaScriptExampleTemplate(config);
        break;
      }
      case "React (TypeScript)": {
        createReactTypeScriptExampleTemplate(config);
        break;
      }
      default: {
        throw new Error(`Language type: ${language} not supported`);
      }
    }
  });
};

const createJavaScriptExampleTemplate = async (config: Config) => {
  const { prefix } = config;
  const fileName = "javascript-example";
  const exampleVar = "name";

  await writeFile(
    join(".gator", "templates", `${fileName}.js`),
    "// JavaScript Example Template\n\n" +
      `const example = 'Hello ${prefix}${exampleVar}!';\n\n` +
      `// Run 'gator generate -p <path> -t ${fileName} --${exampleVar}=<${exampleVar}>' to create a new file based on this template`,
    "utf-8"
  );
  logger.success("Created JavaScript example template!", true);
};

const createTypeScriptExampleTemplate = async (config: Config) => {
  const { prefix } = config;
  const fileName = "typescript-example";
  const exampleVar = "name";

  await writeFile(
    join(".gator", "templates", `${fileName}.ts`),
    "// TypeScript Example Template\n\n" +
      `const typed: string = 'Goodbye ${prefix}${exampleVar}!';\n\n` +
      `// Run 'gator generate -p <path> -t ${fileName} --${exampleVar}=<${exampleVar}>' to create a new file based on this template`,
    "utf-8"
  );
  logger.success("Created TypeScript example template!", true);
};

const createReactJavaScriptExampleTemplate = async (config: Config) => {
  const { prefix } = config;
  const exampleVar = "name";
  const fileName = "react-javascript-example";

  await writeFile(
    join(".gator", "templates", `${fileName}.jsx`),
    "// React JavaScript Example Template\n\n" +
      "import React from 'react';\n\n" +
      "// The file name is supplied automatically when generating a file from a template\n" +
      `const ${prefix}FILE_NAME = () => {\n` +
      `  return <h1>Hello ${prefix}${exampleVar}</h1>;\n` +
      "};\n\n" +
      `// Run 'gator generate -p <path> -t ${fileName} --${exampleVar}=<${exampleVar}>' to create a new file based on this template`,
    "utf-8"
  );
  logger.success("Created React JavaScript example template!", true);
};

const createReactTypeScriptExampleTemplate = async (config: Config) => {
  const { prefix } = config;
  const exampleVar = "name";
  const fileName = "react-typescript-example";

  await writeFile(
    join(".gator", "templates", "react-typescript-example.tsx"),
    "// React TypeScript Example Template\n\n" +
      "import React from 'react';\n\n" +
      "// The file name is supplied automatically when generating a file from a template\n" +
      `const ${prefix}FILE_NAME: React.FC = () => {\n` +
      `  return <h1>Hello ${prefix}${exampleVar}</h1>;\n` +
      "};\n\n" +
      `// Run 'gator generate -p <path> -t ${fileName} --${exampleVar}=<${exampleVar}>' to create a new file based on this template`,
    "utf-8"
  );
  logger.success("Created React TypeScript example template!", true);
};

export default createExampleTemplates;
