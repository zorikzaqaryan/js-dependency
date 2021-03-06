#!/bin/bash

yarn install

NPM_TAG=${2:-"beta"}
MATCHER=${3:-"*"}

NPM_NAME=$(node scripts/utils/attribute.js name)
VERSION=$(node scripts/utils/attribute.js version)

NPM_BIN=$(npm bin)
STABLE=$($NPM_BIN/semver $VERSION -r "*")

# Enable failing on exit status here because semver exits with 1 when the range
# doesn't match.
set -e

new_line()
{
  echo ""
}

verbose()
{
  echo -e " \033[36m→\033[0m $1"
}

verbose_item()
{
  echo -e " \033[96m∙\033[0m $1"
}

success()
{
  echo -e " \033[1;32m✔︎\033[0m $1"
}

cdn_release()
{
  npm run publish:cdn
  new_line
  success "$NPM_NAME ($1) uploaded to cdn"
}

bower_release()
{
  # Check if tag exists
  TAG_NAME="v$VERSION"
  TAG_EXISTS=$(git tag -l "$TAG_NAME")

  if [ ! -z "$TAG_EXISTS" ]; then
    verbose "There is already a tag $TAG_EXISTS in git. Skipping git deploy."
  else
    verbose "Deploying $VERSION to git"

    LAST_COMMIT=$(git log -1 --pretty=%B)
    grep -v -e '^build$' -e '^build/$' .gitignore > /tmp/.gitignore
    mv /tmp/.gitignore .gitignore
    git add --force build/*
    git commit -am "$TAG_NAME"
    git tag "$TAG_NAME" -m "$LAST_COMMIT"
    git push origin $TAG_NAME
    success "$NPM_NAME version ready for bower"
  fi
}

npm_release()
{
  verbose "Checking if version $1 of $NPM_NAME is already available in npm…"

  NPM_EXISTS=$(npm info -s $NPM_NAME@$1 version)

  if [ ! -z "$NPM_EXISTS" ] && [ "$NPM_EXISTS" == "$1" ]; then
    verbose "There is already a version $NPM_EXISTS in npm. Skipping npm publish…"
  else
    verbose "Deploying $1 to npm"
    npm publish
    success "$NPM_NAME uploaded to npm registry"
  fi
}

# Lint
yarn run lint

# Test
yarn run ci:test

# Clean
rm -f build/*.js
rm -f build/*.map

# Build
yarn run build

# Release
git checkout -b dist
bower_release
new_line
npm_release "$VERSION"
new_line
cdn_release "$VERSION"
git checkout master
git branch -D dist
