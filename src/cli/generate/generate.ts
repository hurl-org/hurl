// Internals
import readConfig from "../readConfig";
import { normalizeTemplate, normalizePath } from "./normalize";
import createFile from "./create-file";
import { logger } from "../utils";

// Types
import { Handler } from "../types";

type GenerateArgs = {
  paths: string[];
  template: string;
} & Record<string, string>;

const generate: Handler<GenerateArgs> = async (args) => {
  try {
    const { config } = await readConfig();

    let { paths, template, p, t, _, $0, ...vars } = args;

    const [normalizedTemplate, templateWithoutExt] = await normalizeTemplate(
      template
    );

    for (const path of paths) {
      const [normalizedPath, pathWithoutExt] = await normalizePath(
        path,
        normalizedTemplate
      );

      await createFile(config, {
        path: normalizedPath,
        template: normalizedTemplate,
        templateWithoutExt,
        pathWithoutExt,
        ...vars,
      });
    }
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

export default generate;
