import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import nodeResolve from "@rollup/plugin-node-resolve";
import externals from "rollup-plugin-node-externals";
import { terser } from "rollup-plugin-terser";

const name = "hurl";

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "cjs",
      format: "cjs",
      sourcemap: true,
      esModule: false,
      entryFileNames: `${name}.js`,
    },
    plugins: [
      externals(),
      nodeResolve(),
      typescript({ declaration: true, declarationDir: "cjs" }),
      replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: `cjs/${name}.min.js`,
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      externals(),
      nodeResolve(),
      typescript(),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      terser(),
    ],
  },
];
