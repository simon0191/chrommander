#!/usr/bin/env bash

get_curr_version() {
  jq -r .version dist/manifest.json
}

copy_manifest() {
  rm dist/manifest.json
  cat manifest.json | sed 's/dist\///g' > dist/manifest.json
}

release() {
  npm run build
  copy_manifest
  local version=`get_curr_version`
  cd ./dist
  zip -r ../releases/chrommander-${version}.zip *
  cd ..
}

release
