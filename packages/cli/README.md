<p align="center"><img src="https://raw.githubusercontent.com/hurl-org/hurl/main/static/logo-dark.png" width="300"><p>

<h2 align="center">Hurl: <small>Template File Generator</small></h2>

## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [Commands](#commands)
  - [`init`](#init)
  - [`generate`](#generate)

## Installation

Using [npm](https://www.npmjs.com):

```shell
npm install -g @hurl/cli
```

<p align="center"><img src="https://raw.githubusercontent.com/hurl-org/hurl/main/packages/cli/static/installation-npm.gif" alt="NPM Installation GIF" width="400"></img></p>

Using [yarn](https://yarnpkg.com/):

```shell
yarn global add @hurl/cli
```

<p align="center"><img src="https://raw.githubusercontent.com/hurl-org/hurl/main/packages/cli/static/installation-yarn.gif" alt="Yarn Installation GIF" width="400"></img></p>

## Commands

### `init`

Initialize Hurl

#### Options

- `--skip`: Skip prompts and create default config
  - Type: `boolean`
  - Default: false
  - Alias: `-s`
- `--examples`: Include example templates when creating config
  - Type: `boolean`
  - Default: true
  - Alias: `-e`

#### Examples

- Basic (with prompts & examples)

  ```shell
  $ hurl init
  ```

  Resulting folder structure:

  ```
  project
  │
  └───.hurl
  │   │   .hurl.<js|json|yml|ts>
  │   │
  │   └───templates
  │       │   <language>-example.<js|ts>
  │       │   <language>-example.<js|ts>
  │       │   ...
  ```

- Skip prompts

  ```shell
  $ hurl init -s
  $ hurl init --skip
  $ hurl init --skip=true
  ```

  Resulting folder structure:

  ```
  project
  │
  └───.hurl
  │   │   .hurl.json
  │   │
  │   └───templates
  │       │   <empty>
  ```

- Don't create example templates

  ```shell
  $ hurl init -e=false
  $ hurl init --examples=false
  $ hurl init --no-examples
  ```

  Resulting folder structure:

  ```
  project
  │
  └───.hurl
  │   │   .hurl.<js|json|yml|ts>
  │   │
  │   └───templates
  │       │   <empty>
  ```

### `generate`

Generate files from a template

#### Options

- `--paths`: The paths to the new files
  - Type: `string[]`
  - Alias: `-p`
  - **Required**
- `--template`: The name of the template file/folder
  - Type: `string`
  - Alias: `-t`
  - **Required**
- `--confirm`: Should confirm when overriding an existing file
  - Type: `boolean`
  - Default: true
- `--<some-variable-name>`: Value for some template variable
  - Type: `string`

#### Examples

- Create single file with no variables

  ```shell
  $ hurl generate -p example.js -t template.js
  ```

- Create multiple files with no variables

  ```shell
  $ hurl generate -p example.js example2.js -t template.js
  ```

- Create files with variables

  ```shell
  $ hurl generate -p example.js -t example.js --var=value
  ```
