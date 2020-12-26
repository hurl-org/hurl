// Node
import { join } from "path";
import { mkdir, writeFile } from "../utils";

// Internals
import { logger } from "../utils";

// Constants
import { ALL_CONFIG_FILES } from "./constants";
import { GATOR_PATH } from "../utils";

// Types
import { Config } from "./types";

const createConfig = async (config: Config) => {
  const { format, ...rest } = config;

  await mkdir(GATOR_PATH);
  logger.success(
    "Created .gator directory!",
    ` View: ${process.cwd() + "/" + GATOR_PATH}`
  );
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
  const file = ALL_CONFIG_FILES.JSON;
  const path = join(GATOR_PATH, file);

  await writeFile(path, JSON.stringify(config, null, 2));

  logger.success(
    `Created ${file} file!`,
    ` View: ${process.cwd() + "/" + path}`
  );
};

const createJavaScriptConfig = async (config: ConfigObject) => {
  const file = ALL_CONFIG_FILES.JavaScript;
  const path = join(GATOR_PATH, file);

  await writeFile(path, `module.exports = ${JSON.stringify(config, null, 2)}`);

  logger.success(
    `Created ${file} file!`,
    ` View: ${process.cwd() + "/" + path}`
  );
};

export default createConfig;
