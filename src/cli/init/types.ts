export type Language =
  | "JavaScript"
  | "TypeScript"
  | "React (JavaScript)"
  | "React (TypeScript)";

export type ConfigFileFormat = "JSON" | "JavaScript";

export interface Config {
  languages: Language[];
  format: ConfigFileFormat;
  prefix: string;
}

export { Handler } from "../index";
