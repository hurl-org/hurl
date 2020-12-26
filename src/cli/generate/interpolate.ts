// Node
import { join } from "path";
import { readFile, TEMPLATES_PATH, writeFile } from "../utils";

// Types
import { Config } from "../init/types";
import { GenerateArgs } from "./generate";

const interpolate = async (config: Config, args: GenerateArgs) => {
  const { path, template, ...vars } = args;
  const { prefix } = config;

  let content = await readFile(join(TEMPLATES_PATH, template), "utf-8");

  Object.entries(vars).forEach(([key, value]) => {
    content = content.replace(new RegExp(`${prefix}${key}`), value);
  });

  await writeFile(path, content, "utf-8");
};

export default interpolate;
