// Internals
import checkExistingConfig from "./check-existing-config";
import configEnquirer from "./config-enquirer";
import createConfig from "./create-config";
import createExampleTemplates from "./create-example-templates";

// Types
import { Handler, Config } from "./types";

interface InitArgs {
  skip: boolean;
}

const init: Handler<InitArgs> = async ({ skip }) => {
  await checkExistingConfig();

  let config: Config = {
    languages: ["JavaScript"],
    format: "JSON",
    prefix: "__GATOR__",
  };
  if (!skip) config = await configEnquirer();

  await createConfig(config);
  await createExampleTemplates(config);
};

export default init;
