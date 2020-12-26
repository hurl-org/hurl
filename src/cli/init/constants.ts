// Types
import { Language, ConfigFileFormat } from "./types";

export const ALL_LANGUAGES: Language[] = [
  "JavaScript",
  "TypeScript",
  "React (JavaScript)",
  "React (TypeScript)",
];

export const ALL_FORMATS: ConfigFileFormat[] = ["JSON", "JavaScript"];

export const ALL_CONFIG_FILES: Record<ConfigFileFormat, string> = {
  JSON: ".gator.json",
  JavaScript: ".gator.js",
};
