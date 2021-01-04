// Node
import { join, ParsedPath } from "path";
import { logger, readFile, writeFile } from "../utils";

// Externals
import { prompt } from "enquirer";
import { red } from "chalk";

// Constants
import { DEFAULT_VARIABLES } from "../constants";

// Types
import { ConfigFileContents } from "../types";

interface CreateFileArgs extends Record<string, any> {
  template: ParsedPath;
  templateContents: string;
  path: ParsedPath;
  confirm: boolean;
}

const createFile = async (config: ConfigFileContents, args: CreateFileArgs) => {
  const { template, templateContents, path, confirm, ...vars } = args;
  const { prefix } = config;

  const filePath = join(path.dir, path.base);

  const defaults: Record<typeof DEFAULT_VARIABLES[number], string> = {
    RELATIVE_FILE_PATH_WITHOUT_EXTENSION: join(path.dir, path.name),
    RELATIVE_FILE_PATH: filePath,
    FILE_NAME_WITHOUT_EXTENSION: path.name,
    FILE_NAME: path.base,
    TEMPLATE_NAME_WITHOUT_EXTENSION: template.name,
    TEMPLATE_NAME: template.base,
  };

  const newVars = { ...vars, ...defaults };

  if (confirm && !(await checkExistingFile(filePath))) return;

  let contents = Object.entries(newVars).reduce((contents, [key, value]) => {
    return contents.replace(new RegExp(`${prefix}${key}`), value);
  }, templateContents);

  if (contents.indexOf(prefix) != -1) {
    logger.warn(
      `The prefix '${prefix}' is present in the generated file. Did you forget to supply a variable?`
    );
  }

  await writeFile(filePath, contents, "utf-8");

  logger.success(
    `Created ${filePath} from template ${template.base}!`,
    `View: ./${filePath}`
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
