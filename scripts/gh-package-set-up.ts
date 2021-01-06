import { readdir, writeFile } from "fs/promises";
import { join } from "path";

const PACKAGES_PATH = "packages";

const ghPackageSetUp = async () => {
  const packages = await readdir(PACKAGES_PATH);
  const token = process.argv[2];

  writeFile(".npmrc", `//npm.pkg.github.com/:_authToken=${token}`, "utf-8");

  Promise.all(
    packages.map(async (pkg) => {
      try {
        await readdir(join(PACKAGES_PATH, pkg));
        const packagePath = (fromRoot: boolean) =>
          join(fromRoot ? "." : "..", PACKAGES_PATH, pkg, "package.json");

        let pkgObject = require(packagePath(false));
        pkgObject.name = pkgObject.name.replace("@hurl/", "@hurl-org/");

        await writeFile(
          packagePath(true),
          JSON.stringify(pkgObject, null, 2),
          "utf-8"
        );
      } catch (e) {}
    })
  );
};

ghPackageSetUp();
