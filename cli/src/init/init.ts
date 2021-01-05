// Node
import { mkdir } from "../utils";

// Internals
import checkExistingConfig from "./check-existing-config";
import configEnquirer from "./config-enquirer";
import createConfig from "./create-config";
import createExampleTemplates from "./create-example-templates";
import { logger } from "../utils";

// Constants
import { HURL_PATH, TEMPLATES_PATH } from "../constants";

// Types
import { InitArgs, InitConfig } from "./types";
import { Handler } from "../types";

const init: Handler<InitArgs> = async (args) => {
  const { skip, examples } = args;

  try {
    await checkExistingConfig();

    let config: InitConfig = {
      examples: [],
      format: "JSON",
      prefix: "__HURL__",
      variables: {},
    };

    if (!skip) config = { ...config, ...(await configEnquirer(args)) };

    await mkdir(HURL_PATH);

    await createConfig(config);

    await mkdir(TEMPLATES_PATH);

    if (examples) {
      await createExampleTemplates(config);
    }
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

export default init;
