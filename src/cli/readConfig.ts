// Externals
import { cosmiconfig, defaultLoaders } from "cosmiconfig";
import TypeScriptLoader from "@endemolshinegroup/cosmiconfig-typescript-loader";

// Internals
import { readdir } from "./utils";

// Constants
import { ALL_CONFIG_FILES } from "./init/constants";
import { GATOR_PATH, TEMPLATES_PATH } from "./utils";
import { Config } from "./init/types";

const readConfig = async () => {
  try {
    await readdir(GATOR_PATH);
  } catch (e) {
    throw new Error(
      "Are you in the correct directory? No Gator directory found in the current directory, run 'gator init' to configure Gator"
    );
  }
  try {
    await readdir(TEMPLATES_PATH);
  } catch (e) {
    throw new Error(
      "Are you in the correct directory? No Gator templates found in the current directory, run 'gator init' to create default templates or create your own"
    );
  }
  const explorer = cosmiconfig("gator", {
    searchPlaces: Object.values(ALL_CONFIG_FILES),
    loaders: { noExt: defaultLoaders[".json"], ".ts": TypeScriptLoader },
    stopDir: process.cwd(),
  });
  const config = await explorer.search(GATOR_PATH);

  if (config === null)
    throw new Error(
      "Are you in the correct directory? No Gator config file found in the current directory, run 'gator init' to create a config file or create your own"
    );

  return config as { config: Config; filepath: string };
};

export default readConfig;
