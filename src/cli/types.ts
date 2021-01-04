export interface Variable {
  required?: boolean;
  default?: string;
}

export interface ConfigFileContents {
  prefix: string;
  variables: Record<string, Variable>;
}

export type ConfigFileFormat = "JSON" | "JavaScript" | "TypeScript" | "YAML";

export type Handler<T> = (args: T) => void | Promise<void>;
