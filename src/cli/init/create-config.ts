// Node
import { join } from "path";
import { mkdir, writeFile } from "../utils";

// Internals
import { logger } from "../utils";

// Types
import { Config } from "./types";

const createConfig = async (config: Config) => {
  const { format, ...rest } = config;

  try {
    await mkdir(join(".gator"));
    logger.success("Created .gator directory!", true);
    switch (format) {
      case "JSON": {
        createJsonConfig(rest);
        break;
      }
      case "JavaScript": {
        createJavaScriptConfig(rest);
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
  await writeFile(
    join(".gator", ".gator.json"),
    JSON.stringify(config, null, 2),
    "utf-8"
  );
  logger.success("Created .gator.json file!", true);
};

const createJavaScriptConfig = async (config: ConfigObject) => {
  await writeFile(
    join(".gator", ".gator.js"),
    `module.exports = ${JSON.stringify(config, null, 2)}`,
    "utf-8"
  );
  logger.success("Created .gator.js file!", true);
};

export default createConfig;
