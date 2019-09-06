#!/bin/bash -e

install -v -m 744 files/node-v10.16.3-linux-armv7l.tar.xz "${ROOTFS_DIR}/root"

#echo "copy config for global npm"
#install -v -m 666 files/npmrc "${ROOTFS_DIR}/etc/"

echo "install npm "
