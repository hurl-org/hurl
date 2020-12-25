export enum Language {
  JavaScript = "JavaScript",
  TypeScript = "TypeScript",
  "React (JavaScript)" = "React (JavaScript)",
  "React (TypeScript)" = "React (TypeScript)",
}

export enum Format {
  JSON = "JSON",
  JavaScript = "JavaScript",
}

export interface Config {
  languages: Language[];
  format: Format;
  prefix: string;
}

export { Handler } from "../index";
