// Node
import { join } from "path";
import { mkdir, writeFile } from "../utils";

// Internals
import { logger } from "../utils";

// Constants
import { TEMPLATES_PATH } from "../constants";

// Types
import { InitConfig } from "./types";

const createExampleTemplates = async (config: InitConfig) => {
  await mkdir(TEMPLATES_PATH);
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

const createJavaScriptExampleTemplate = async (config: InitConfig) => {
  const { prefix } = config;
  const fileName = "javascript-example";
  const file = `${fileName}.js`;

  const path = join(TEMPLATES_PATH, file);

  const exampleVar = "name";

  await writeFile(
    path,
    "// JavaScript Example Template\n\n" +
      `const example = 'Hello ${prefix}${exampleVar}!';\n\n` +
      `// Run 'gator generate -p <path> -t ${fileName} --${exampleVar}=<${exampleVar}>' to create a new file based on this template`,
    "utf-8"
  );
  logger.success(
    "Created JavaScript example template!",
    ` View: ${process.cwd() + "/" + path}`
  );
};

const createTypeScriptExampleTemplate = async (config: InitConfig) => {
  const { prefix } = config;
  const fileName = "typescript-example";
  const file = `${fileName}.ts`;

  const path = join(TEMPLATES_PATH, file);

  const exampleVar = "name";

  await writeFile(
    path,
    "// TypeScript Example Template\n\n" +
      `const typed: string = 'Goodbye ${prefix}${exampleVar}!';\n\n` +
      `// Run 'gator generate -p <path> -t ${fileName} --${exampleVar}=<${exampleVar}>' to create a new file based on this template`,
    "utf-8"
  );
  logger.success(
    "Created TypeScript example template!",
    ` View: ${process.cwd() + "/" + path}`
  );
};

const createReactJavaScriptExampleTemplate = async (config: InitConfig) => {
  const { prefix } = config;
  const fileName = "react-javascript-example";
  const file = `${fileName}.jsx`;

  const path = join(TEMPLATES_PATH, file);

  const exampleVar = "name";

  await writeFile(
    path,
    "// React JavaScript Example Template\n\n" +
      "import React from 'react';\n\n" +
      "// The file name is supplied automatically when generating a file from a template\n" +
      `const ${prefix}FILE_NAME = () => {\n` +
      `  return <h1>Hello ${prefix}${exampleVar}</h1>;\n` +
      "};\n\n" +
      `// Run 'gator generate -p <path> -t ${fileName} --${exampleVar}=<${exampleVar}>' to create a new file based on this template`,
    "utf-8"
  );
  logger.success(
    "Created React JavaScript example template!",
    ` View: ${process.cwd() + "/" + path}`
  );
};

const createReactTypeScriptExampleTemplate = async (config: InitConfig) => {
  const { prefix } = config;
  const fileName = "react-typescript-example";
  const file = `${fileName}.tsx`;

  const path = join(TEMPLATES_PATH, file);

  const exampleVar = "name";

  await writeFile(
    path,
    "// React TypeScript Example Template\n\n" +
      "import React from 'react';\n\n" +
      "// The file name is supplied automatically when generating a file from a template\n" +
      `const ${prefix}FILE_NAME: React.FC = () => {\n` +
      `  return <h1>Hello ${prefix}${exampleVar}</h1>;\n` +
      "};\n\n" +
      `// Run 'gator generate -p <path> -t ${fileName} --${exampleVar}=<${exampleVar}>' to create a new file based on this template`,
    "utf-8"
  );
  logger.success(
    "Created React TypeScript example template!",
    ` View: ${process.cwd() + "/" + path}`
  );
};

export default createExampleTemplates;
