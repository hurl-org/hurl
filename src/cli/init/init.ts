// Internals
import checkExistingConfig from "./check-existing-config";
import configEnquirer from "./config-enquirer";
import createConfig from "./create-config";
import createExampleTemplates from "./create-example-templates";
import { logger } from "../utils";

// Types
import { InitConfig } from "./types";
import { Handler } from "../types";

interface InitArgs {
  skip: boolean;
}

const init: Handler<InitArgs> = async ({ skip }) => {
  try {
    await checkExistingConfig();

    let config: InitConfig = {
      languages: [],
      format: "JSON",
      prefix: "__GATOR__",
    };
    if (!skip) config = await configEnquirer();

    await createConfig(config);
    await createExampleTemplates(config);
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

export default init;
