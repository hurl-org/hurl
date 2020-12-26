// Node
import { dirname, extname, join } from "path";

// Internals
import { logger, readdir, mkdir, writeFile, readFile } from "../utils";

// Constants
import { ALL_CONFIG_FILES } from "../init/constants";

// Types
import { Handler } from "../index";

interface GenerateArgs {
  path: string;
  template: string;
  [x: string]: any;
}

const generate: Handler<GenerateArgs> = async (args) => {
  try {
    await checkForGatorConfig();

    let { path, template } = args;

    template = await normalizeTemplate(template);

    path = await normalizePath(path, template);

    await writeFile(path, "gello", "utf-8");

    console.log(path, template);
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

const normalizeTemplate = async (template: string) => {
  const containsExt = !!extname(template).length;

  const templates = await readdir(join(".gator", "templates"));

  const newTemplate = templates.find((t) => {
    if (!containsExt) t = t.replace(/\.[^/.]+$/, "");
    return t === template;
  });

  if (newTemplate === undefined)
    throw new Error(`The template '${template}' does not exist`);

  return newTemplate;
};

const normalizePath = async (path: string, template: string) => {
  const parentDir = dirname(path);

  await mkdir(parentDir, { recursive: true });

  if (!extname(path).length) path += extname(template);

  return path;
};

const checkForGatorConfig = async () => {
  try {
    await readdir(".gator");
  } catch (e) {
    throw new Error(
      "No Gator directory found, run 'gator init' to configure Gator"
    );
  }
  try {
    await Promise.any(
      Object.values(ALL_CONFIG_FILES).map((file) =>
        readFile(join(".gator", file))
      )
    );
  } catch (e) {
    throw new Error(
      "No Gator config file found, run 'gator init' to create a config file or create your own"
    );
  }
  try {
    await readdir(join(".gator", "templates"));
  } catch (e) {
    throw new Error(
      "No Gator templates found, run 'gator init' to create default templates or create your own"
    );
  }
};

export default generate;
