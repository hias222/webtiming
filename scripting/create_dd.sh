#!/bin/bash

RASP_DIR=/Users/matthiasfuchs/projects/schwimmen/webtiming/raspberry/pi-gen
DEVICE_NAME=disk3
IMAGE_DATE=2019-11-08

cd $RASP_DIR
cd deploy/tmp

unzip -o ../image_$IMAGE_DATE-clientall-singledata.zip


diskutil umountDisk /dev/$DEVICE_NAME
sudo dd bs=4m if=$IMAGE_DATE-clientall-singledata.img of=/dev/r$DEVICE_NAME conv=sync

diskutil eject /dev/$DEVICE_NAME

rm -f $IMAGE_DATE*
