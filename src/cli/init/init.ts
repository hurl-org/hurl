// Node
import { mkdir } from "../utils";

// Internals
import checkExistingConfig from "./check-existing-config";
import configEnquirer from "./config-enquirer";
import createConfig from "./create-config";
import createExampleTemplates from "./create-example-templates";
import { logger } from "../utils";

// Constants
import { GATOR_PATH, TEMPLATES_PATH } from "../constants";

// Types
import { InitArgs, InitConfig } from "./types";
import { Handler } from "../types";

const init: Handler<InitArgs> = async (args) => {
  const { skip, examples } = args;

  try {
    await checkExistingConfig();

    let config: InitConfig = {
      format: "JSON",
      prefix: "__GATOR__",
    };

    if (!skip) config = await configEnquirer(args);

    await mkdir(GATOR_PATH);

    await createConfig(config);

    await mkdir(TEMPLATES_PATH);

    if (examples) {
      config.examples = [];
      await createExampleTemplates(config);
    }
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

export default init;
