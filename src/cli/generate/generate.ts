// Internals
import { logger, readFile, writeFile } from "../utils";

// Types
import { Handler } from "../index";

interface GenerateArgs {
  path: string;
  template: string;
  [x: string]: any;
}

const generate: Handler<GenerateArgs> = async (args) => {
  try {
    const { path, template } = args;

    await writeFile(path, "gello", "utf-8");

    console.log(path, template);
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

export default generate;
