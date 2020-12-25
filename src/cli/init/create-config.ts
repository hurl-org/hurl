// Node
import { join } from "path";
import { mkdir, writeFile } from "../utils";

// Internals
import { logger } from "../utils";

// Types
import { Config, Format } from "./types";

const createConfig = async (config: Config) => {
  const { format, ...rest } = config;

  try {
    logger.line("Creating .gator directory...");
    await mkdir(join(".gator"));
    logger.success("Created .gator directory!");
    switch (format) {
      case Format.JSON: {
        await createJsonConfig(rest);
        break;
      }
      case Format.JavaScript: {
        await createJavaScriptConfig(rest);
        break;
      }
      default: {
        throw new Error("Can't write to unknown file type.");
      }
    }
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

type ConfigObject = Omit<Config, "format">;

const createJsonConfig = async (config: ConfigObject) => {
  logger.line("Creating .gator.json file...");
  await writeFile(
    join(".gator", ".gator.json"),
    JSON.stringify(config, null, 2),
    "utf-8"
  );
  logger.success("Created .gator.json file!");
};

const createJavaScriptConfig = async (config: ConfigObject) => {
  logger.line("Creating .gator.js file...");
  await writeFile(
    join(".gator", ".gator.js"),
    `module.exports = ${JSON.stringify(config, null, 2)}`,
    "utf-8"
  );
  logger.success("Created .gator.js file!");
};

export default createConfig;
