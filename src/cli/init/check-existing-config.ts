// Node
import { readdir, rimrafPromise, logger } from "../utils";

// Externals
import { prompt } from "enquirer";

const checkExistingConfig = async () => {
  try {
    await readdir(".gator"); // Will throw error if it doesn't exist

    console.log(); // Empty Line
    const response = await prompt<{ proceed: boolean }>({
      name: "proceed",
      type: "confirm",
      message:
        "A Gator directory already exists. Do you want to proceed and delete the existing config?",
    });

    if (!response.proceed) process.exit(0); // User chooses to keep existing config

    try {
      await rimrafPromise(".gator");
      logger.success("Removed existing .gator directory!");
    } catch (e) {
      logger.error(e);
      process.exit(1);
    }
  } catch (e) {}
};

export default checkExistingConfig;
