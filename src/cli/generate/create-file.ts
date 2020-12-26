// Node
import { basename, join } from "path";
import { logger, readFile, writeFile } from "../utils";

// Externals
import { prompt } from "enquirer";
import { red } from "chalk";

// Constants
import { DEFAULT_VARIABLES, TEMPLATES_PATH } from "../constants";

// Types
import { ConfigFileContents } from "../types";

interface CreateFileArgs extends Record<string, string> {
  template: string;
  templateWithoutExt: string;
  path: string;
  pathWithoutExt: string;
}

const createFile = async (config: ConfigFileContents, args: CreateFileArgs) => {
  const { template, templateWithoutExt, path, pathWithoutExt, ...vars } = args;
  const { prefix } = config;

  const defaults: Record<typeof DEFAULT_VARIABLES[number], string> = {
    RELATIVE_FILE_PATH_WITHOUT_EXTENSION: pathWithoutExt,
    RELATIVE_FILE_PATH: path,
    FILE_NAME_WITHOUT_EXTENSION: basename(pathWithoutExt),
    FILE_NAME: basename(path),
    TEMPLATE_NAME_WITHOUT_EXTENSION: templateWithoutExt,
    TEMPLATE_NAME: template,
  };

  const newVars = { ...vars, ...defaults };

  if (!(await checkExistingFile(path))) return;

  let content = await readFile(join(TEMPLATES_PATH, template), "utf-8");

  Object.entries(newVars).forEach(([key, value]) => {
    content = content.replace(new RegExp(`${prefix}${key}`), value);
  });

  if (content.indexOf(prefix) != -1) {
    logger.warn(
      `The prefix '${prefix}' is present in the generated file. Did you forget to supply a variable?`
    );
  }

  await writeFile(path, content, "utf-8");

  logger.success(
    `Created ${path} from template ${template}!`,
    `View: ./${path}`
  );
};

const checkExistingFile = async (path: string) => {
  try {
    await readFile(path, "utf-8");
    console.log(); // Empty line
    const response = await prompt<{ proceed: boolean }>({
      name: "proceed",
      type: "confirm",
      message: `The file ${path} already exists. Do you want to proceed and ${red(
        "DELETE"
      )} the existing file?`,
    });

    return response.proceed;
  } catch (e) {
    return true;
  }
};

export default createFile;
