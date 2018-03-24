#!/bin/bash
if [ "$#" -ne 1 ]; then
	echo "Please provide a single argument (a mongodb passwrod)"
	exit 1
fi

echo "Running meteor with external mongodb..."

MONGO_PWD=$1

MONGO_URL="mongodb://admin:${MONGO_PWD}@159.65.225.215:27017/foodDB" meteor