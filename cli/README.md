<p align="center">
<img src="https://raw.githubusercontent.com/gator-org/gator/main/static/banner-light.png" width="800">
<p>

<h2 align="center">Template File Generator</h2>

## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [Commands](#commands)
  - [`init`](#init)
  - [`generate`](#generate)

## Installation

```shell
npm install -g @gator/cli
```

## Commands

### `init`

Initialize Gator

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
  $ gator init
  ```

- Skip prompts

  ```shell
  $ gator init -s
  $ gator init --skip
  $ gator init --skip=true
  ```

- Don't create example templates

  ```shell
  $ gator init -e=false
  $ gator init --examples=false
  $ gator init --no-examples
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
  $ gator generate -p example.js -t template.js
  ```

- Create multiple files with no variables

  ```shell
  $ gator generate -p example.js example2.js -t template.js
  ```

- Create files with variables

  ```shell
  $ gator generate -p example.js -t example.js --var=value
  ```
