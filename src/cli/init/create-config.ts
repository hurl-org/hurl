// Node
import { join } from "path";
import { mkdir, writeFile } from "../utils";

// Internals
import { logger } from "../utils";

// Types
import { Config, Format } from "./types";

const createConfig = async (config: Config) => {
  const extension =
    config.format === Format.JSON
      ? ".json"
      : config.format === Format.JavaScript
      ? ".js"
      : "";

  console.log(config);

  try {
    await mkdir(join(".gator"));
    await writeFile(
      join(".gator", `.gator${extension}`),
      JSON.stringify(config),
      "utf-8"
    );
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

export default createConfig;
