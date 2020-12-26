// Types
import { ConfigFileFormat } from "../types";

export type Language =
  | "JavaScript"
  | "TypeScript"
  | "React (JavaScript)"
  | "React (TypeScript)";

export interface InitConfig {
  languages: Language[];
  format: ConfigFileFormat;
  prefix: string;
}
