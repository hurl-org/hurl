// Node
import { join } from "path";

// Types
import { ConfigFileContents, ConfigFileFormat } from "./types";

export const GATOR_PATH = join(".gator");

export const TEMPLATES_PATH = join(GATOR_PATH, "templates");

export const DEFAULT_VARIABLES = [
  "RELATIVE_FILE_PATH_WITHOUT_EXTENSION",
  "RELATIVE_FILE_PATH",
  "FILE_NAME_WITHOUT_EXTENSION",
  "FILE_NAME",
  "TEMPLATE_NAME_WITHOUT_EXTENSION",
  "TEMPLATE_NAME",
] as const;

export const ALL_CONFIG_FILE_EXTENSIONS: Record<ConfigFileFormat, string> = {
  JSON: ".json",
  JavaScript: ".js",
  TypeScript: ".ts",
  YAML: ".yml",
};

export const ALL_CONFIG_FILES = Object.entries(
  ALL_CONFIG_FILE_EXTENSIONS
).reduce((prev, [key, value]) => {
  return { ...prev, [key]: `.gator${value}` };
}, {} as typeof ALL_CONFIG_FILE_EXTENSIONS);

export const DEFAULT_CONFIG_FILE: ConfigFileContents = {
  prefix: "__GATOR__",
  variables: {},
};
