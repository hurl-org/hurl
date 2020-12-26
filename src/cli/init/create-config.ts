// Node
import { join } from "path";
import { mkdir, writeFile } from "../utils";

// Internals
import { logger } from "../utils";

// Constants
import { ALL_CONFIG_FILES } from "../constants";
import { GATOR_PATH } from "../utils";

// Types
import { ConfigFileContents, ConfigFileFormat } from "../types";
import { InitConfig } from "./types";

const createConfig = async (config: InitConfig) => {
  const { format, languages, ...rest } = config;

  await mkdir(GATOR_PATH);
  logger.success(
    "Created .gator directory!",
    ` View: ${process.cwd() + "/" + GATOR_PATH}`
  );

  const file = ALL_CONFIG_FILES[format];
  const path = join(GATOR_PATH, file);

  await writeFile(path, CONFIG_FILE_CONTENTS[format](rest));

  logger.success(
    `Created ${file} file!`,
    ` View: ${process.cwd() + "/" + path}`
  );
};

type ConfigCreator = (config: ConfigFileContents) => string;

const CONFIG_FILE_CONTENTS: Record<ConfigFileFormat, ConfigCreator> = {
  JSON: (config) => JSON.stringify(config, null, 2),
  JavaScript: (config) => `module.exports = ${JSON.stringify(config, null, 2)}`,
  TypeScript: (config) => `export default ${JSON.stringify(config, null, 2)}`,
};

export default createConfig;
