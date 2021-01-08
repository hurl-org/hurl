// Node
import { readFile } from "fs/promises";

// Externals
import { config } from "dotenv-safe";
import { Octokit } from "@octokit/rest";

// Internals
import getChangeLogSection from "./helpers/get-changelog-section";

config();

const recreateReleases = async () => {
  const changelog = (await readFile("CHANGELOG.md", "utf-8")).trim();

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const { data: releases } = await octokit.repos.listReleases({
    owner: "hurl-org",
    repo: "hurl",
    per_page: 10,
  });

  releases.forEach(
    async ({
      id,
      name,
      tag_name,
      body,
      target_commitish,
      draft,
      prerelease,
    }) => {
      const section = await getChangeLogSection(
        changelog,
        tag_name.substring(1)
      );

      if (section !== body) {
        console.log(`Updating release ${name} ...`);
        await octokit.repos.updateRelease({
          owner: "hurl-org",
          repo: "hurl",
          release_id: id,
          tag_name,
          body: section,
          draft,
          prerelease,
          name,
          target_commitish,
        });
      }
    }
  );
};

recreateReleases();
