#!/bin/bash

rm -rf dist
ncc build src/hurl.ts --out dist
mv dist/index.js dist/hurl.js

ncc build src/hurl.ts -m --out dist
mv dist/index.js dist/hurl.min.js
