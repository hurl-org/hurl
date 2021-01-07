// Node
import { readFile } from "fs/promises";

// Externals
import { config } from "dotenv-safe";
import * as moment from "moment";
import { Octokit } from "@octokit/rest";

config();

const getChangeLogSection = async (tagName: string) => {
  const version = tagName.substring(1);

  const changelog = (await readFile("CHANGELOG.md", "utf-8")).trim();

  const sectionTitle = `## [${version}] - (${moment().format("YYYY-MM-DD")})`;

  const titleIndex = changelog.indexOf(sectionTitle);

  if (titleIndex < 0)
    throw new Error(
      `Could not find section for latest tag '${tagName}' in CHANGELOG`
    );

  const endIndex = changelog.indexOf("---", titleIndex);

  if (endIndex < 0)
    throw new Error(
      `Section for version '${tagName}' does not have closing ---`
    );

  const section = changelog.substring(titleIndex, endIndex).trim();

  const links = changelog.substring(
    changelog.indexOf("<!-- Start Reference Links -->")
  );

  return section + "\n\n" + links;
};

const postVersionBump = async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const { data: tags } = await octokit.repos.listTags({
    owner: "hurl-org",
    repo: "hurl",
  });

  const latestTag = tags[0];

  const body = await getChangeLogSection(latestTag.name);

  await octokit.repos.createRelease({
    owner: "hurl-org",
    repo: "hurl",
    name: latestTag.name,
    tag_name: latestTag.name,
    body,
    target_commitish: latestTag.commit.sha,
  });
};

postVersionBump();
