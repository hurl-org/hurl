// Types
import { ConfigFileFormat } from "../types";

export interface InitArgs {
  skip: boolean;
  examples: boolean;
}

export type Example =
  | "JavaScript"
  | "TypeScript"
  | "React (JavaScript)"
  | "React (TypeScript)";

export interface InitConfig {
  format: ConfigFileFormat;
  prefix: string;
  examples?: Example[];
}
