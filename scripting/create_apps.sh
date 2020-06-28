#!/bin/bash

RASP_DIR=/Users/matthiasfuchs/projects/schwimmen/webtiming/raspberry/pi-gen

START_DIR=`pwd`
echo $START_DIR

check_exit(){
    if [[ -f $1 ]]; then
        echo "component $2  ---  OK"
    else
        echo failure in $2
        echo "no file $1"
        exit 1
    fi
}

cd $START_DIR

##########################################################
COMPONENT_NAME=frontendweb
echo "---------------------------------------------------"
echo react
#cd ../react_frontend/swimfrontend
cd ../frontendweb
rm -rf node_modules
npm install
npm run build
cd build

rm ${RASP_DIR}/stage6/03-install-web/files/web.zip
zip -q ${RASP_DIR}/stage6/03-install-web/files/web.zip * -r

check_exit ${RASP_DIR}/stage6/03-install-web/files/web.zip $COMPONENT_NAME

echo ""

rm ${RASP_DIR}/stage8/02-install-web/files/web.zip
zip -q ${RASP_DIR}/stage8/02-install-web/files/web.zip * -r

check_exit ${RASP_DIR}/stage8/02-install-web/files/web.zip $COMPONENT_NAME

echo ""

rm ${RASP_DIR}/stage9/01-install-web/files/web.zip
zip -q ${RASP_DIR}/stage9/01-install-web/files/web.zip * -r

check_exit ${RASP_DIR}/stage9/01-install-web/files/web.zip $COMPONENT_NAME

echo ""

##########################################################
COMPONENT_NAME=datamapping
echo "---------------------------------------------------"
echo datamapping
cd $START_DIR
cd ../datamapping

rm ${RASP_DIR}/stage6/01-install-app/files/app.zip
zip -q ${RASP_DIR}/stage6/02-install-app/files/app.zip app.js package.json property.ini uploads/* incoming/* mqtt/* data/* resources/*

check_exit ${RASP_DIR}/stage6/02-install-app/files/app.zip $COMPONENT_NAME

echo ""

rm ${RASP_DIR}/stage8/01-install-app/files/app.zip
zip -q ${RASP_DIR}/stage8/01-install-app/files/app.zip app.js package.json property.ini uploads/* incoming/* mqtt/* data/* resources/*

check_exit ${RASP_DIR}/stage8/01-install-app/files/app.zip $COMPONENT_NAME

echo ""

rm ${RASP_DIR}/cloud1/00-install-cloud/files/app.zip
zip -q ${RASP_DIR}/cloud1/00-install-cloud/files/app.zip app.js package.json property.ini uploads/* incoming/* mqtt/* data/* resources/*

check_exit ${RASP_DIR}/cloud1/00-install-cloud/files/app.zip $COMPONENT_NAME

echo ""echo ""

##########################################################
COMPONENT_NAME=websocket
echo "---------------------------------------------------"
echo websocket backend
cd $START_DIR
cd ../websocket_backend

rm ${RASP_DIR}/stage6/03-install-web/files/app.zip
zip -q ${RASP_DIR}/stage6/03-install-web/files/app.zip app.js package.json routes/* outgoing/*

check_exit ${RASP_DIR}/stage6/03-install-web/files/app.zip $COMPONENT_NAME

echo ""

rm ${RASP_DIR}/stage8/02-install-web/files/app.zip
zip -q ${RASP_DIR}/stage8/02-install-web/files/app.zip app.js package.json routes/* outgoing/*

check_exit ${RASP_DIR}/stage8/02-install-web/files/app.zip $COMPONENT_NAME

echo ""

rm ${RASP_DIR}/stage9/01-install-web/files/app.zip
zip -q ${RASP_DIR}/stage9/01-install-web/files/app.zip app.js package.json routes/* outgoing/*

check_exit ${RASP_DIR}/stage9/01-install-web/files/app.zip $COMPONENT_NAME

##########################################################
COMPONENT_NAME=admin
echo "---------------------------------------------------"
cd $START_DIR
echo react admin
cd ../administration
npm run-script build
cd build

rm ${RASP_DIR}/stage6/04-install-admin/files/web.zip
zip -q ${RASP_DIR}/stage6/04-install-admin/files/web.zip * -r

check_exit ${RASP_DIR}/stage6/04-install-admin/files/web.zip $COMPONENT_NAME

rm ${RASP_DIR}/stage8/03-install-admin/files/web.zip
zip -q ${RASP_DIR}/stage8/03-install-admin/files/web.zip * -r


##########################################################
COMPONENT_NAME=monitor
echo "---------------------------------------------------"
echo monitor
cd $START_DIR
cd ../monitor

rm ${RASP_DIR}/monitor1/00-install-monitor/files/app.zip
zip -q ${RASP_DIR}/monitor1/00-install-monitor/files/app.zip app.js package.json property.ini mqtt/* views/*

check_exit ${RASP_DIR}/monitor1/00-install-monitor/files/app.zip $COMPONENT_NAME
