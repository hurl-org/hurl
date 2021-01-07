// Node
import { mkdir, readdir } from "fs/promises";
import { join } from "path";

// Externals
import { cosmiconfig } from "cosmiconfig";
import TypeScriptLoader from "@endemolshinegroup/cosmiconfig-typescript-loader";

// Internals
import logger from "./logger";
import createExampleTemplates from "./helpers/create-example-templates";

// Constants
import { ALL_CONFIG_FILES, DEFAULT_CONFIG_FILE } from "./constants";

// Types
import { ConfigFileContents, Example } from "./types";

process.on("uncaughtException", (e: Error) => logger.error(e));
process.on("unhandledRejection", (e: Error) => logger.error(e));

export class HurlUtils {
  dir: string;
  hurlDir: string;
  templatesDir: string;

  constructor(dir?: string) {
    this.dir = dir ?? process.cwd();
    this.hurlDir = join(this.dir, ".hurl");
    this.templatesDir = join(this.hurlDir, "templates");
  }

  changeDir(dir: string) {
    this.dir = dir;
  }

  async getHurlDir(): Promise<string[]> {
    try {
      const contents = await readdir(this.hurlDir);
      return contents;
    } catch (e) {
      throw new Error(
        "No Hurl directory found in the current directory, run 'hurl init' to configure Hurl"
      );
    }
  }

  async getTemplates(): Promise<string[]> {
    try {
      const contents = await readdir(this.templatesDir);
      return contents;
    } catch (e) {
      throw new Error(
        `No Hurl templates directory found in ${this.hurlDir}, run 'hurl init' to create default templates or create your own`
      );
    }
  }

  async getConfig() {
    const explorer = cosmiconfig("hurl", {
      searchPlaces: Object.values(ALL_CONFIG_FILES),
      loaders: { ".ts": TypeScriptLoader },
      stopDir: process.cwd(),
    });
    const result = await explorer.search(this.hurlDir);
    if (result === null)
      throw new Error(
        `No Hurl config file or empty config file found in '${this.hurlDir}', run 'hurl init' to create a config file or create your own`
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
  }

  async createHurlDir(): Promise<void> {
    await mkdir(this.hurlDir);
    logger.success("Created .hurl directory!", `View: ./${this.hurlDir}`);
  }

  async createTemplatesDir(): Promise<void> {
    await mkdir(this.templatesDir);
    logger.success("Created templates directory!", `View: ./${this.hurlDir}`);
  }

  async createExampleTemplates(
    examples: Example[],
    config: ConfigFileContents
  ) {
    createExampleTemplates(examples, this.templatesDir, config);
  }

  createConfig() {}
}

export { default as logger } from "./logger";
export * from "./types";
export * from "./constants";
