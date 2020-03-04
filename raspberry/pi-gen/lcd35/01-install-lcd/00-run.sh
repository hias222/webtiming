#!/bin/bash -e

install -v -m 744 files/LCD-show-master.zip "${ROOTFS_DIR}/root"

#echo "copy config for global npm"
#install -v -m 666 files/npmrc "${ROOTFS_DIR}/etc/"

echo "install lcd "
