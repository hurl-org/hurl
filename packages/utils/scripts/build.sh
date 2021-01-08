#!/bin/bash

rm -rf dist
ncc build src/hurl-utils.ts --out dist
mv dist/index.js dist/hurl-utils.js

ncc build src/hurl-utils.ts -m --out dist
mv dist/index.js dist/hurl-utils.min.js

mv dist/hurl-utils.d.ts dist/index.d.ts
