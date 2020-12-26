export interface ConfigFileContents {
  prefix: string;
}

export type ConfigFileFormat = "JSON" | "JavaScript" | "TypeScript" | "YAML";

export type Handler<T> = (args: T) => void | Promise<void>;
