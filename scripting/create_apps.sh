#!/bin/bash

RASP_DIR=/Users/matthiasfuchs/projects/schwimmen/webtiming/raspberry/pi-gen

START_DIR=`pwd`
echo $START_DIR

cd $START_DIR
echo react
cd ../react_frontend/swimfrontend
npm run-script build
cd build

rm ${RASP_DIR}/stage6/02-install-web/files/web.zip
zip ${RASP_DIR}/stage6/02-install-web/files/web.zip * -r

echo "stage6 ${RASP_DIR}/stage6/02-install-web/files"
echo `ls -la ${RASP_DIR}/stage6/02-install-web/files`

echo ""

rm ${RASP_DIR}/stage8/02-install-web/files/web.zip
zip ${RASP_DIR}/stage8/02-install-web/files/web.zip * -r

echo "stage8 ${RASP_DIR}/stage8/02-install-web/files"
echo `ls -la ${RASP_DIR}/stage8/02-install-web/files`

echo ""

rm ${RASP_DIR}/stage9/01-install-web/files/web.zip
zip ${RASP_DIR}/stage9/01-install-web/files/web.zip * -r

echo "stage9 ${RASP_DIR}/stage9/01-install-web/files"
echo `ls -la ${RASP_DIR}/stage9/01-install-web/files`

echo ""

echo "----"
echo datamapping
cd $START_DIR
cd ../datamapping

rm ${RASP_DIR}/stage6/01-install-app/files/app.zip
zip ${RASP_DIR}/stage6/01-install-app/files/app.zip app.js package.json incoming/* mqtt/* data/* resources/* views/*

echo "stage6 ${RASP_DIR}/stage6/01-install-app/files/"
echo `ls -la ${RASP_DIR}/stage6/01-install-app/files/`

echo ""

rm ${RASP_DIR}/stage8/01-install-app/files/app.zip
zip ${RASP_DIR}/stage8/01-install-app/files/app.zip app.js package.json incoming/* mqtt/* data/* resources/* views/*

echo "stage8 ${RASP_DIR}/stage8/01-install-app/files"
echo `ls -la ${RASP_DIR}/stage8/01-install-app/files`

echo ""echo ""

echo "----"
echo websocket
cd $START_DIR
cd ../websocket_backend

rm ${RASP_DIR}/stage6/02-install-web/files/app.zip
zip ${RASP_DIR}/stage6/02-install-web/files/app.zip app.js package.json routes/* 

echo "stage6 ${RASP_DIR}/stage6/02-install-web/files"
echo `ls -la ${RASP_DIR}/stage6/02-install-web/files`

echo ""

rm ${RASP_DIR}/stage8/02-install-web/files/app.zip
zip ${RASP_DIR}/stage8/02-install-web/files/app.zip app.js package.json routes/* 

echo "stage8 ${RASP_DIR}/stage8/02-install-web/files"
echo `ls -la ${RASP_DIR}/stage8/02-install-web/files`

echo ""

rm ${RASP_DIR}/stage9/01-install-web/files/app.zip
zip ${RASP_DIR}/stage9/01-install-web/files/app.zip app.js package.json routes/* 

echo "stage9 ${RASP_DIR}/stage9/01-install-web/files"
echo `ls -la ${RASP_DIR}/stage9/01-install-web/files`


cd $START_DIR
echo react admin
cd ../react_frontend/administration
npm run-script build
cd build

rm ${RASP_DIR}/stage6/03-install-admin/files/web.zip
zip ${RASP_DIR}/stage6/03-install-admin/files/web.zip * -r

echo "stage6 ${RASP_DIR}/stage6/03-install-admin/files"
echo `ls -la ${RASP_DIR}/stage6/03-install-admin/files`