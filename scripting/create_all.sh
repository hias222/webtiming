#!/bin/bash

./create_apps.sh

# delete old ones

docker rm -v pigen_work

# create image
cd ${RASP_DIR}
./build-docker.sh -c clientall
#./build-docker.sh -c client7
#./build-docker.sh -c client35
