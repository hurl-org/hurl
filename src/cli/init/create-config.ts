// Node
import { join } from "path";
import { mkdir, writeFile } from "../utils";

// Internals
import { logger } from "../utils";

// Constants
import { ALL_CONFIG_FILES } from "./constants";

// Types
import { Config } from "./types";

const createConfig = async (config: Config) => {
  const { format, ...rest } = config;

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
};

type ConfigObject = Omit<Config, "format">;

const createJsonConfig = async (config: ConfigObject) => {
  const fileName = ALL_CONFIG_FILES.JSON;

  await writeFile(
    join(".gator", fileName),
    JSON.stringify(config, null, 2),
    "utf-8"
  );
  logger.success(`Created ${fileName} file!`, true);
};

const createJavaScriptConfig = async (config: ConfigObject) => {
  const fileName = ALL_CONFIG_FILES.JavaScript;

  await writeFile(
    join(".gator", fileName),
    `module.exports = ${JSON.stringify(config, null, 2)}`,
    "utf-8"
  );
  logger.success(`Created ${fileName} file!`, true);
};

export default createConfig;
