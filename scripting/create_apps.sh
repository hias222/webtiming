#!/bin/bash

START_DIR=`pwd`
echo $START_DIR

cd $START_DIR
echo react
cd ../react_frontend/swimfrontend
npm run-script build
cd build
rm ../../../../raspberry/pi-gen/stage6/02-install-web/files/web.zip
zip ../../../../raspberry/pi-gen/stage6/02-install-web/files/web.zip * -r

echo datamapping
cd $START_DIR
cd ../datamapping
rm ../../raspberry/pi-gen/stage6/01-install-app/files/app.zip
zip ../../raspberry/pi-gen/stage6/01-install-app/files/app.zip app.js package.json incoming/* mqtt/* data/* resources/* views/*

echo websocket
cd $START_DIR
cd ../websocket_backend
rm ../../raspberry/pi-gen/stage6/02-install-web/files/app.zip
zip ../../raspberry/pi-gen/stage6/02-install-web/files/app.zip app.js package.json routes/* 
