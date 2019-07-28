#!/bin/bash

## datamapping
cd ../datamapping
npm start >> ../scripting/log.txt & 

## websocket backend

cd ../websocket_backend
npm start >> ../scripting/log.txt &

## frontend
cd ../react_frontend/swimfrontend
npm start >> ../../scripting/log.txt & 