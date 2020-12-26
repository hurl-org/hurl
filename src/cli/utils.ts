// Node
import { promisify } from "util";
import { promises } from "fs";

// Externals
import rimraf from "rimraf";
import { green, red, yellow } from "chalk";

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
  warn: (warning: string) => {
    console.warn(yellow(warning));
  },
  line: (str: string) => console.log(`\n${str}`),
};
