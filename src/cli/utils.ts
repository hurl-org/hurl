// Node
import { promisify } from "util";
import { promises } from "fs";
export const { readdir, mkdir, writeFile, readFile } = promises;

// Externals
import rimraf from "rimraf";
export const rimrafPromise = promisify(rimraf);

import { green, red } from "chalk";

export const logger = {
  success: (str: string, extra = "") => {
    const colored = green(str) + extra;
    logger.line(colored);
  },
  error: (err: Error) => {
    console.log(red("Gator ERROR"));
    console.error(err);
  },
  line: (str: string) => console.log(`\n${str}`),
};
