#!/bin/bash -e

install -v -m 744 files/pigio-master.zip "${ROOTFS_DIR}/root"

echo "copy pigpio "
