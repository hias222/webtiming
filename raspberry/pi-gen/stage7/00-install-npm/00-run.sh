#!/bin/bash -e

install -v -m 744 files/node-v12.16.2-linux-armv7l.tar.xz "${ROOTFS_DIR}/root"

echo "copy npm "
