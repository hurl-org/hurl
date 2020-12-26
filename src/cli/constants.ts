// Types
import { ConfigFileFormat } from "./types";

export const ALL_CONFIG_FILES: Record<ConfigFileFormat, string> = {
  JSON: ".gator.json",
  JavaScript: ".gator.js",
  TypeScript: ".gator.ts",
};
