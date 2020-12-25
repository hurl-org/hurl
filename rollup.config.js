import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/cli/index.ts",
  output: {
    file: "bundle.js",
    format: "cjs",
    banner: "#!/usr/bin/env node",
  },
  plugins: [typescript(), resolve(), commonjs()],
};
