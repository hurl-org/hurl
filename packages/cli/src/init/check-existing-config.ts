// Node
import { readdir, rimrafPromise } from "../utils";

// Externals
import { prompt } from "enquirer";
import { red } from "chalk";

// Internals
import { logger } from "../utils";

// Constants
import { HURL_PATH } from "../constants";

const checkExistingConfig = async (): Promise<void> => {
  try {
    await readdir(HURL_PATH); // Will throw error if it doesn't exist

    console.log(); // Empty Line
    await confirmDelete();

    try {
      await rimrafPromise(HURL_PATH);
      logger.success("Removed existing .hurl directory!");
    } catch (e) {
      logger.error(e);
      process.exit(1);
    }
  } catch (e) {
    // Continue if no existing directory
  }
};

export const confirmDelete = async (): Promise<void> => {
  const response = await prompt<{ proceed: boolean }>({
    name: "proceed",
    type: "confirm",
    message: `A .hurl directory already exists. Do you want to proceed and ${red(
      "DELETE"
    )} the existing config?`,
  });
  if (!response.proceed) process.exit(0); // User chooses to keep existing config
};

export default checkExistingConfig;
