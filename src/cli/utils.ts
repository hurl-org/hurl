// Node
import { promisify } from "util";
import { promises } from "fs";

// Externals
import rimraf from "rimraf";
import { green, red } from "chalk";

export const { readdir, mkdir, writeFile, readFile } = promises;

export const rimrafPromise = promisify(rimraf);

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
