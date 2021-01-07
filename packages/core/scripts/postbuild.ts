import { join } from "path";
import { writeFile } from "fs/promises";

const postbuild = async () => {
  try {
    writeFile(
      join("dist", "index.js"),
      "'use strict';\n\nif (process.env.NODE_ENV === 'production') {\n  module.exports = require('./hurl.min.js');" +
        "\n} else {\n  module.exports = require('./hurl.js');\n}"
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

postbuild();
