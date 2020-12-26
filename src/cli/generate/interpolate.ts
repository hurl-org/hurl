// Node
import { join } from "path";
import { readFile, writeFile } from "../utils";

// Constants
import { TEMPLATES_PATH } from "../constants";

// Types
import { GenerateArgs } from "./generate";
import { ConfigFileContents } from "../types";

const interpolate = async (config: ConfigFileContents, args: GenerateArgs) => {
  const { path, template, ...vars } = args;
  const { prefix } = config;

  let content = await readFile(join(TEMPLATES_PATH, template), "utf-8");

  Object.entries(vars).forEach(([key, value]) => {
    content = content.replace(new RegExp(`${prefix}${key}`), value);
  });

  await writeFile(path, content, "utf-8");
};

export default interpolate;
