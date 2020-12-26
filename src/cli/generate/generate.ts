// Internals
import interpolate from "./interpolate";
import { normalizeTemplate, normalizePath } from "./normalize";
import readConfig from "../readConfig";
import { logger } from "../utils";

// Types
import { Handler } from "../index";

export interface GenerateArgs extends Record<string, string> {
  path: string;
  template: string;
}

const generate: Handler<GenerateArgs> = async (args) => {
  try {
    const config = await readConfig();

    let { path, template, p, t, _, $0, ...vars } = args;

    template = await normalizeTemplate(template);

    path = await normalizePath(path, template);

    await interpolate(config.config, { path, template, ...vars });
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

export default generate;
