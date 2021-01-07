// Node
import { join } from "path";
import { writeFile, rm } from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";

// Externals
import recursive from "recursive-readdir";

const execute = promisify(exec);

const keepTypings = ["dist/index.d.ts"];

const postbuild = async () => {
  try {
    writeFile(
      join("dist", "index.js"),
      "'use strict';\n\nif (process.env.NODE_ENV === 'production') {\n  module.exports = require('./hurl-utils.min.js');" +
        "\n} else {\n  module.exports = require('./hurl-utils.js');\n}"
    );
    recursive("dist").then((files) => {
      files.forEach((file) => {
        if (file.length > 5) {
          const ending = file.substr(file.length - 5);
          if (ending === ".d.ts" && !keepTypings.includes(file)) {
            rm(file);
          }
        }
      });
    });
    execute("find . -type d -empty -delete");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

postbuild();
