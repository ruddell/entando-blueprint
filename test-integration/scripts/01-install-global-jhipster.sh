#!/bin/bash

set -e

#-------------------------------------------------------------------------------
# Install JHipster Generator
#-------------------------------------------------------------------------------
echo "*** generator-jhipster: use last version"
npm install -g generator-jhipster@v$JHI_VERSION

#-------------------------------------------------------------------------------
# Install yeoman
#-------------------------------------------------------------------------------
echo "*** yeoman: use last version"
npm install -g yo

#-------------------------------------------------------------------------------
# Install JHipster Entando
#-------------------------------------------------------------------------------
echo "*** generator-jhipster-entando: use current branch version"
npm ci
npm link

