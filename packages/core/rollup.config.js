import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const name = "hurl";

const cjs = [
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
      nodeResolve(),
      typescript(),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      terser(),
    ],
  },
];

const umd = [
  {
    input: "src/index.ts",
    output: {
      file: `umd/${name}.js`,
      format: "umd",
      name: "Hurl",
    },
    plugins: [
      nodeResolve(),
      typescript({ sourceMap: false }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: `umd/${name}.min.js`,
      format: "umd",
      name: "Hurl",
    },
    plugins: [
      typescript({ sourceMap: false }),
      nodeResolve(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      terser(),
    ],
  },
];

const createConfig = () => {
  switch (process.env.BUILD_ENV) {
    case "cjs": {
      return [...cjs];
    }
    case "umd": {
      return [...umd];
    }
    default: {
      return [...cjs, ...umd];
    }
  }
};

export default createConfig();
