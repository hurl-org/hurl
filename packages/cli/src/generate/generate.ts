// Internals
import readConfig from "../readConfig";
import { normalizeTemplate, normalizePath } from "./normalize";
import createFile from "./create-file";
import { logger } from "../utils";

// Types
import { Handler } from "../types";

interface GenerateArgs extends Record<string, unknown> {
  paths: string[];
  template: string;
  confirm: boolean;
  // Extra
  p: string[];
  t: string;
  _: string[];
  $0: string;
}

const generate: Handler<GenerateArgs> = async (args) => {
  try {
    const { config } = await readConfig();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { paths, template, confirm, p, t, _, $0, ...vars } = args;

    const [
      parsedTemplate,
      templateContents,
      newConfig,
    ] = await normalizeTemplate(template, config);

    for (const path of paths) {
      const parsedPath = await normalizePath(path, parsedTemplate);

      await createFile(newConfig, {
        path: parsedPath,
        template: parsedTemplate,
        templateContents,
        confirm,
        ...vars,
      });
    }
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

export default generate;
