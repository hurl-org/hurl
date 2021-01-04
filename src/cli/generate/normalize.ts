// Node
import { join, parse, ParsedPath } from "path";

// Externals
import { cosmiconfig } from "cosmiconfig";
import TypeScriptLoader from "@endemolshinegroup/cosmiconfig-typescript-loader";
import merge from "lodash.merge";

// Internals
import { readdir, mkdir, readFile } from "../utils";

// Constants
import { ALL_CONFIG_FILE_EXTENSIONS, TEMPLATES_PATH } from "../constants";

// Types
import { ConfigFileContents } from "../types";

export const normalizeTemplate = async (
  template: string,
  config: ConfigFileContents
): Promise<[ParsedPath, string, ConfigFileContents]> => {
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
  const parsedTemplatePath = parse(templatePath);

  try {
    const templateContents = await readFile(templatePath, "utf-8");
    return [parsedTemplatePath, templateContents, config];
  } catch (e) {
    const files = await readdir(templatePath, "utf-8");
    const templateFile = files.find((file) => parse(file).name === "template");
    if (templateFile === undefined)
      throw new Error(
        `No template file found in ${templatePath}. Template files must be named 'template.<extension>'`
      );
    const templateFilePath = join(templatePath, templateFile);
    const templateContents = await readFile(templateFilePath, "utf-8");
    const explorer = cosmiconfig("config", {
      searchPlaces: Object.values(ALL_CONFIG_FILE_EXTENSIONS).map(
        (ext) => `config${ext}`
      ),
      loaders: { ".ts": TypeScriptLoader },
      stopDir: TEMPLATES_PATH,
    });

    const result = await explorer.search(templatePath);

    let newConfig = { ...config };
    if (result) merge(newConfig, result.config);

    return [
      parse(
        join(
          TEMPLATES_PATH,
          parsedTemplatePath.name + parse(templateFilePath).ext
        )
      ),
      templateContents,
      newConfig,
    ];
  }
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
