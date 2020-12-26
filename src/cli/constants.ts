// Node
import { join } from "path";

// Types
import { ConfigFileFormat } from "./types";

export const ALL_CONFIG_FILES: Record<ConfigFileFormat, string> = {
  JSON: ".gator.json",
  JavaScript: ".gator.js",
  TypeScript: ".gator.ts",
  YAML: ".gator.yml",
};

export const GATOR_PATH = join(".gator");

export const TEMPLATES_PATH = join(GATOR_PATH, "templates");
