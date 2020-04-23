#!/bin/bash

## datamapping
echo datamapping
cd ../datamapping
npm start >> ../scripting/log.txt & 

## websocket backend
echo websocket_backend
cd ../websocket_backend
npm start >> ../scripting/log.txt &


## frontend
echo administration
cd ../react_frontend/administration
npm start >> ../../scripting/log.txt & 

## frontend
#cd ../react_frontend/swimfrontend
#npm start >> ../../scripting/log.txt & 