// Node
import { join } from "path";
import { writeFile } from "../utils";

// Externals
import { dump } from "js-yaml";

// Internals
import { logger } from "../utils";

// Constants
import { ALL_CONFIG_FILES, HURL_PATH } from "../constants";

// Types
import { InitConfig } from "./types";
import { ConfigFileContents, ConfigFileFormat } from "../types";

const createConfig = async (config: InitConfig): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { format, examples, ...rest } = config;

  const configFile = ALL_CONFIG_FILES[format];
  const configFilePath = join(HURL_PATH, configFile);

  await writeFile(configFilePath, CONFIG_FILE_CONTENTS[format](rest));

  logger.success(`Created ${configFile} file!`, `View: ${configFilePath}`);
};

type ConfigCreator = (config: ConfigFileContents) => string;

const CONFIG_FILE_CONTENTS: Record<ConfigFileFormat, ConfigCreator> = {
  JSON: (config) => JSON.stringify(config, null, 2),
  JavaScript: (config) => `module.exports = ${JSON.stringify(config, null, 2)}`,
  TypeScript: (config) => `export default ${JSON.stringify(config, null, 2)}`,
  YAML: (config) => dump(config),
};

export default createConfig;
