export type Language =
  | "JavaScript"
  | "TypeScript"
  | "React (JavaScript)"
  | "React (TypeScript)";

export type Format = "JSON" | "JavaScript";

export interface Config {
  languages: Language[];
  format: Format;
  prefix: string;
}

export { Handler } from "../index";
