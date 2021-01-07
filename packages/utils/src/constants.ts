// Types
import { ConfigFileContents, ConfigFileFormat } from "./types";

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

export const ALL_CONFIG_FILES: Record<ConfigFileFormat, string> = {
  JSON: ".hurl.json",
  JavaScript: ".hurl.js",
  TypeScript: ".hurl.ts",
  YAML: ".hurl.yml",
};

export const DEFAULT_CONFIG_FILE: ConfigFileContents = {
  prefix: "__HURL__",
  variables: {},
};
