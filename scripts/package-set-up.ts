import { readdir, writeFile } from "fs/promises";
import { join } from "path";

type PublishType = "gh-packages" | "npm";

const PACKAGES_PATH = "packages";

process.on("uncaughtException", (e) => {
  console.error(e);
  process.exit(1);
});

const ghPackageSetUp = async () => {
  const packages = await readdir(PACKAGES_PATH);
  const type = process.env.NODE_PUBLISH_TYPE as PublishType;
  const token = process.env.NODE_AUTH_TOKEN;

  if (type !== "gh-packages" && type !== "npm") {
    throw new Error("NODE_PUBLISH_TYPE must be 'gh-packages' or 'npm'");
  }
  if (typeof token !== "string") {
    throw new Error("Please specify the NODE_AUTH_TOKEN");
  }

  const npmReg = "registry.npmjs.org";
  const ghReg = "npm.pkg.github.com";

  writeFile(
    ".npmrc",
    `//${type === "gh-packages" ? ghReg : npmReg}/:_authToken=${token}`,
    "utf-8"
  );

  const toReplace = type === "gh-packages" ? "@hurl/" : "@hurl-org/";
  const replaceWith = type === "gh-packages" ? "@hurl-org/" : "@hurl/";

  Promise.all(
    packages.map(async (pkg) => {
      try {
        await readdir(join(PACKAGES_PATH, pkg));
        const packagePath = (fromRoot: boolean) =>
          join(fromRoot ? "." : "..", PACKAGES_PATH, pkg, "package.json");

        let pkgObject = require(packagePath(false));
        pkgObject.name = pkgObject.name.replace(toReplace, replaceWith);

        await writeFile(
          packagePath(true),
          JSON.stringify(pkgObject, null, 2) + "\n",
          "utf-8"
        );
      } catch (e) {}
    })
  );
};

ghPackageSetUp();
