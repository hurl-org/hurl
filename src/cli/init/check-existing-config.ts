// Node
import { readdir, rimrafPromise, logger } from "../utils";

// Externals
import { prompt } from "enquirer";
import { red } from "chalk";

// Constants
import { GATOR_PATH } from "../utils";

const checkExistingConfig = async () => {
  try {
    await readdir(GATOR_PATH); // Will throw error if it doesn't exist

    console.log(); // Empty Line
    const response = await prompt<{ proceed: boolean }>({
      name: "proceed",
      type: "confirm",
      message: `A .gator directory already exists. Do you want to proceed and ${red(
        "DELETE"
      )} the existing config?`,
    });

    if (!response.proceed) process.exit(0); // User chooses to keep existing config

    try {
      await rimrafPromise(GATOR_PATH);
      logger.success("Removed existing .gator directory!");
    } catch (e) {
      logger.error(e);
      process.exit(1);
    }
  } catch (e) {}
};

export default checkExistingConfig;
