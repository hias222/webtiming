#!/bin/bash

RASP_DIR=/Users/matthiasfuchs/projects/schwimmen/webtiming/raspberry/pi-gen

START_DIR=`pwd`
echo $START_DIR

cd $START_DIR

echo "---------------------------------------------------"
echo react
cd ../react_frontend/swimfrontend
npm run-script build
cd build

rm ${RASP_DIR}/stage6/02-install-web/files/web.zip
zip -q ${RASP_DIR}/stage6/02-install-web/files/web.zip * -r

echo "stage6 ${RASP_DIR}/stage6/02-install-web/files"
echo `ls -la ${RASP_DIR}/stage6/02-install-web/files/web.zip`

echo ""

rm ${RASP_DIR}/stage8/02-install-web/files/web.zip
zip -q ${RASP_DIR}/stage8/02-install-web/files/web.zip * -r

echo "stage8 ${RASP_DIR}/stage8/02-install-web/files"
echo `ls -la ${RASP_DIR}/stage8/02-install-web/files/web.zip`

echo ""

rm ${RASP_DIR}/stage9/01-install-web/files/web.zip
zip -q ${RASP_DIR}/stage9/01-install-web/files/web.zip * -r

echo "stage9 ${RASP_DIR}/stage9/01-install-web/files"
echo `ls -la ${RASP_DIR}/stage9/01-install-web/files/web.zip`

echo ""

echo "---------------------------------------------------"
echo datamapping
cd $START_DIR
cd ../datamapping

rm ${RASP_DIR}/stage6/01-install-app/files/app.zip
zip -q ${RASP_DIR}/stage6/01-install-app/files/app.zip app.js package.json property.ini uploads/* incoming/* mqtt/* data/* resources/*

echo "stage6 ${RASP_DIR}/stage6/01-install-app/files/"
echo `ls -la ${RASP_DIR}/stage6/01-install-app/files/app.zip`

echo ""

rm ${RASP_DIR}/stage8/01-install-app/files/app.zip
zip -q ${RASP_DIR}/stage8/01-install-app/files/app.zip app.js package.json property.ini uploads/* incoming/* mqtt/* data/* resources/*

echo "stage8 ${RASP_DIR}/stage8/01-install-app/files"
echo `ls -la ${RASP_DIR}/stage8/01-install-app/files/app.zip`

echo ""

rm ${RASP_DIR}/cloud1/00-install-cloud/files/app.zip
zip -q ${RASP_DIR}/cloud1/00-install-cloud/files/app.zip app.js package.json property.ini uploads/* incoming/* mqtt/* data/* resources/*

echo "cloud1 ${RASP_DIR}/cloud1/00-install-cloud/files"
echo `ls -la ${RASP_DIR}/cloud1/00-install-cloud/files/app.zip`

echo ""echo ""

echo "---------------------------------------------------"
echo websocket backend
cd $START_DIR
cd ../websocket_backend

rm ${RASP_DIR}/stage6/02-install-web/files/app.zip
zip -q ${RASP_DIR}/stage6/02-install-web/files/app.zip app.js package.json routes/* 

echo "stage6 ${RASP_DIR}/stage6/02-install-web/files"
echo `ls -la ${RASP_DIR}/stage6/02-install-web/files/app.zip`

echo ""

rm ${RASP_DIR}/stage8/02-install-web/files/app.zip
zip -q ${RASP_DIR}/stage8/02-install-web/files/app.zip app.js package.json routes/* 

echo "stage8 ${RASP_DIR}/stage8/02-install-web/files"
echo `ls -la ${RASP_DIR}/stage8/02-install-web/files/app.zip`

echo ""

rm ${RASP_DIR}/stage9/01-install-web/files/app.zip
zip -q ${RASP_DIR}/stage9/01-install-web/files/app.zip app.js package.json routes/* 

echo "stage9 ${RASP_DIR}/stage9/01-install-web/files"
echo `ls -la ${RASP_DIR}/stage9/01-install-web/files/app.zip`

echo "---------------------------------------------------"
cd $START_DIR
echo react admin
cd ../react_frontend/administration
npm run-script build
cd build

rm ${RASP_DIR}/stage6/03-install-admin/files/web.zip
zip -q ${RASP_DIR}/stage6/03-install-admin/files/web.zip * -r

echo "stage6 ${RASP_DIR}/stage6/03-install-admin/files"
echo `ls -la ${RASP_DIR}/stage6/03-install-admin/files/web.zip`

rm ${RASP_DIR}/stage8/03-install-admin/files/web.zip
zip -q ${RASP_DIR}/stage8/03-install-admin/files/web.zip * -r


echo "---------------------------------------------------"
echo monitor
cd $START_DIR
cd ../monitor

rm ${RASP_DIR}/monitor1/00-install-monitor/files/app.zip
zip -q ${RASP_DIR}/monitor1/00-install-monitor/files/app.zip app.js package.json property.ini mqtt/* views/*

echo "monitor1 ${RASP_DIR}/monitor1/00-install-monitor/files/app.zip"
echo `ls -la ${RASP_DIR}/monitor1/00-install-monitor/files/app.zip`

# delete old ones

docker rm -v pigen_work

# create image
cd ${RASP_DIR}
#./build-docker.sh -c clientall
#./build-docker.sh -c client7
./build-docker.sh -c client35
