#!/bin/bash

rm -rf dist
ncc build src/hurl.ts --out dist
mv dist/index.js dist/hurl-utils.js

ncc build src/hurl.ts -m --out dist
mv dist/index.js dist/hurl-utils.min.js

mv dist/hurl.d.ts dist/index.d.ts