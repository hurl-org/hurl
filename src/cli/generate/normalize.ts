// Node
import { join, parse, ParsedPath } from "path";

// Internals
import { readdir, mkdir, readFile } from "../utils";

// Constants
import { TEMPLATES_PATH } from "../constants";

export const normalizeTemplate = async (
  template: string
): Promise<[ParsedPath, string]> => {
  const templates = await readdir(TEMPLATES_PATH);

  const { name: templateName, ext: templateExt } = parse(template);

  const templateBase = templates.find((t) => {
    const { name: tName, base: tBase } = parse(t);
    if (!templateExt.length) return tName === templateName;
    return tBase === templateName + templateExt;
  });

  if (templateBase === undefined)
    throw new Error(`The template '${template}' does not exist`);

  const templatePath = join(TEMPLATES_PATH, templateBase);

  const templateContents = await readFile(templatePath, "utf-8");

  return [parse(templatePath), templateContents];
};

export const normalizePath = async (
  path: string,
  template: ParsedPath
): Promise<ParsedPath> => {
  let parsedPath = parse(path);

  await mkdir(parsedPath.dir, { recursive: true });

  if (!parsedPath.ext.length) parsedPath = parse(path + template.ext);

  return parsedPath;
};
