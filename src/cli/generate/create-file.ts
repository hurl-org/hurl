// Node
import { basename, join } from "path";
import { logger, readFile, writeFile } from "../utils";

// Constants
import { DEFAULT_VARIABLES, TEMPLATES_PATH } from "../constants";

// Types
import { GenerateArgs } from "./generate";
import { ConfigFileContents } from "../types";

interface CreateFileArgs extends GenerateArgs {
  templateWithoutExt: string;
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
};

export default createFile;
