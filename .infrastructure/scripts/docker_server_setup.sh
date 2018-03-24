#!/bin/bash
# setup the machine that will host the food piler docker image

yum install -y docker-ce

systemctl start docker
systemctl enable docker
