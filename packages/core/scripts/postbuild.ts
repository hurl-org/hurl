import { join } from "path";
import { writeFile } from "fs/promises";

const cjs = async () => {
  try {
    await writeFile(
      join("cjs", "index.js"),
      "'use strict';\n\nif (process.env.NODE_ENV === 'production') {\n  module.exports = require('./react-hash-scroll.min.js');" +
        "\n} else {\n  module.exports = require('./react-hash-scroll.js');\n}"
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const postbuild = async () => {
  switch (process.env.BUILD_ENV) {
    case "cjs": {
      await cjs();
      break;
    }
    case "umd": {
      break;
    }
    default: {
      cjs();
    }
  }
};

postbuild();
