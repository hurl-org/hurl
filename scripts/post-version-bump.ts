// Node
import { readFile } from "fs/promises";

// Externals
import { config } from "dotenv-safe";
import { Octokit } from "@octokit/rest";

// Internals
import getChangeLogSection from "./helpers/get-changelog-section";

config();

const postVersionBump = async () => {
  const changelog = (await readFile("CHANGELOG.md", "utf-8")).trim();

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const { data: tags } = await octokit.repos.listTags({
    owner: "hurl-org",
    repo: "hurl",
  });

  const latestTag = tags[0];

  const body = await getChangeLogSection(
    changelog,
    latestTag.name.substring(1)
  );

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
