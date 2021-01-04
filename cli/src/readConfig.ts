// Externals
import { cosmiconfig } from "cosmiconfig";
import TypeScriptLoader from "@endemolshinegroup/cosmiconfig-typescript-loader";

// Internals
import { readdir } from "./utils";

// Constants
import {
  ALL_CONFIG_FILES,
  DEFAULT_CONFIG_FILE,
  GATOR_PATH,
  TEMPLATES_PATH,
} from "./constants";

// Types
import { ConfigFileContents } from "./types";

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
    loaders: { ".ts": TypeScriptLoader },
    stopDir: process.cwd(),
  });
  const result = await explorer.search(GATOR_PATH);

  if (result === null)
    throw new Error(
      "Are you in the correct directory? No Gator config file or empty config file found in the current directory, run 'gator init' to create a config file or create your own"
    );

  return {
    ...result,
    config: {
      ...DEFAULT_CONFIG_FILE,
      ...result.config,
    },
  } as {
    config: ConfigFileContents;
    filepath: string;
  };
};

export default readConfig;
