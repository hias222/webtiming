#!/bin/bash
RASP_DIR=/Users/matthiasfuchs/projects/schwimmen/webtiming/raspberry/pi-gen

START_DIR=`pwd`
echo $START_DIR

./create_apps.sh

# delete old ones

docker rm -v pigen_work

# create image
cd ${RASP_DIR}
./build-docker.sh -c clientall
#./build-docker.sh -c client7
#./build-docker.sh -c client35
