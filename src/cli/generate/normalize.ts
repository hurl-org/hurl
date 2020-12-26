// Node
import { dirname, extname } from "path";

// Internals
import { readdir, mkdir } from "../utils";

// Constants
import { TEMPLATES_PATH } from "../constants";

export const normalizeTemplate = async (
  template: string
): Promise<[string, string]> => {
  const containsExt = !!extname(template).length;

  const templates = await readdir(TEMPLATES_PATH);

  const newTemplate = templates.find((t) => {
    if (!containsExt) t = removeExtension(t);
    return t === template;
  });

  if (newTemplate === undefined)
    throw new Error(`The template '${template}' does not exist`);

  return [newTemplate, removeExtension(newTemplate)];
};

export const normalizePath = async (
  path: string,
  template: string
): Promise<[string, string]> => {
  const parentDir = dirname(path);

  await mkdir(parentDir, { recursive: true });

  if (!extname(path).length) path += extname(template);

  return [path, removeExtension(path)];
};

const removeExtension = (str: string) => str.replace(/\.[^/.]+$/, "");
