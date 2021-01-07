// Node
import { readdir } from "fs/promises";
import { join } from "path";

// Internals
import logger from "./logger";

export class HurlUtils {
  private dir: string;

  constructor(dir?: string) {
    this.dir = dir ?? process.cwd();
  }

  changeDir(dir: string) {
    this.dir = dir;
  }

  getHurlDir(): Promise<string[]> {
    return readdir(join(this.dir, ".hurl"));
  }

  getTemplates(): Promise<string[]> {
    return readdir(join(this.dir, ".hurl", "templates"));
  }
}

process.on("uncaughtException", (e: Error) => logger.error(e));
process.on("unhandledRejection", (e: Error) => logger.error(e));
