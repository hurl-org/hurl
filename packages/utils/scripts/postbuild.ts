import { join } from "path";
import { writeFile, rm } from "fs/promises";
import recursive from "recursive-readdir";

const postbuild = async () => {
  try {
    writeFile(
      join("cjs", "index.js"),
      "'use strict';\n\nif (process.env.NODE_ENV === 'production') {\n  module.exports = require('./hurl-utils.min.js');" +
        "\n} else {\n  module.exports = require('./hurl-utils.js');\n}"
    );
    recursive("cjs").then((files) => {
      files.forEach((file) => {
        if (file.length > 5) {
          const ending = file.substr(file.length - 5);
          if (ending === ".d.ts" && file !== "cjs/index.d.ts") {
            rm(file);
          }
        }
      });
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

postbuild();
