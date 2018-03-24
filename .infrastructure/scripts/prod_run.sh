#!/bin/bash
docker run -d \
  -e ROOT_URL=http://foodpiler.cameronholloway.com \
  -e MONGO_URL=mongodb://admin:${MONGO_PWD}@159.65.225.215:27017/foodDB \
  -p 80:3000 \
  yourname/app