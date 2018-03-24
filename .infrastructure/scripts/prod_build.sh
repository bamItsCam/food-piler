#!/bin/bash
# Build script for foodpiler

meteor build .infrastructure/staging --architecture os.linux.x86_64

docker build -t $(cat ../meta/imagename.properties):$(cat ../meta/version.properties) .infrastructure/Dockerfile