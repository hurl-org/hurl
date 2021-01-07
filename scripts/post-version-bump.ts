import { readFile } from "fs/promises";

const postVersionBump = async () => {
  const changelog = await readFile("CHANGELOG.md", "utf-8");
  const links = changelog.substring(
    changelog.indexOf("<!-- Start Reference Links -->")
  );
  console.log(links);
};

postVersionBump();
