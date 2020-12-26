// Internals
import readConfig from "../readConfig";
import { normalizeTemplate, normalizePath } from "./normalize";
import createFile from "./create-file";
import { logger } from "../utils";

// Types
import { Handler } from "../types";

export interface GenerateArgs extends Record<string, string> {
  path: string;
  template: string;
}

const generate: Handler<GenerateArgs> = async (args) => {
  try {
    const { config } = await readConfig();

    let { path, template, p, t, _, $0, ...vars } = args;

    const [normalizedTemplate, templateWithoutExt] = await normalizeTemplate(
      template
    );

    const [normalizedPath, pathWithoutExt] = await normalizePath(
      path,
      template
    );

    await createFile(config, {
      path: normalizedPath,
      template: normalizedTemplate,
      templateWithoutExt,
      pathWithoutExt,
      ...vars,
    });

    logger.success(`Created ${path} file from template ${template}!`);
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

export default generate;
