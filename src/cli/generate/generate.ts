// Node
import { join } from "path";

// Internals
import { logger, readdir, writeFile, readFile } from "../utils";
import { normalizeTemplate, normalizePath } from "./normalize";

// Constants
import { ALL_CONFIG_FILES } from "../init/constants";
import { GATOR_PATH, TEMPLATES_PATH } from "../utils";

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

const checkForGatorConfig = async () => {
  try {
    await readdir(GATOR_PATH);
  } catch (e) {
    throw new Error(
      "No Gator directory found, run 'gator init' to configure Gator"
    );
  }
  try {
    await Promise.any(
      Object.values(ALL_CONFIG_FILES).map((file) =>
        readFile(join(GATOR_PATH, file))
      )
    );
  } catch (e) {
    throw new Error(
      "No Gator config file found, run 'gator init' to create a config file or create your own"
    );
  }
  try {
    await readdir(TEMPLATES_PATH);
  } catch (e) {
    throw new Error(
      "No Gator templates found, run 'gator init' to create default templates or create your own"
    );
  }
};

export default generate;
