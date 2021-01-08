const getChangeLogSection = async (
  changelog: string,
  version: string
): Promise<string> => {
  const sectionTitle = new RegExp(
    `## \\[${version}\\] \\- \\(\\d{4}\\-\\d{2}\\-\\d{2}\\)`,
    "m"
  );

  const titleMatch = changelog.match(sectionTitle);

  if (titleMatch === null)
    throw new Error(
      `Could not find section for version '${version}' in CHANGELOG`
    );

  const endIndex = changelog.indexOf("---", titleMatch.index);

  if (endIndex < 0)
    throw new Error(
      `Section for version '${version}' does not have closing ---`
    );

  const section = changelog.substring(titleMatch.index, endIndex).trim();

  const links = changelog.substring(
    changelog.indexOf("<!-- Start Reference Links -->")
  );

  return section + "\n\n" + links;
};

export default getChangeLogSection;
