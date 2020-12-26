// Internals
import readConfig from "../readConfig";
import { normalizeTemplate, normalizePath } from "./normalize";
import createFile from "./create-file";
import { logger } from "../utils";

// Types
import { Handler } from "../types";

interface GenerateArgs extends Record<string, any> {
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

    let { paths, template, confirm, p, t, _, $0, ...vars } = args;

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
