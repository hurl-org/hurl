// Internals
import checkExistingConfig from "./check-existing-config";
import configEnquirer from "./config-enquirer";
import createConfig from "./create-config";

// Types
import { Handler, Config, Language, Format } from "./types";

interface InitArgs {
  skip: boolean;
}

const init: Handler<InitArgs> = async ({ skip }) => {
  await checkExistingConfig();

  let config: Config = {
    languages: [Language.JavaScript],
    format: Format.JSON,
    prefix: "__GATOR__",
  };
  if (!skip) config = await configEnquirer();

  await createConfig(config);
};

export default init;
