export interface ConfigFileContents {
  prefix: string;
}

export type ConfigFileFormat = "JSON" | "JavaScript" | "TypeScript";

export type Handler<T> = (args: T) => void | Promise<void>;
