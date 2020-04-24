#!/bin/bash -e

install -v -m 744 files/pigpio-master.zip "${ROOTFS_DIR}/root"
install -v -o 1000 -g 1000 -m 744 files/checkapi "${ROOTFS_DIR}/home/${FIRST_USER_NAME}"
install -v -m 744 files/colorado.service "${ROOTFS_DIR}/etc/systemd/system"

echo "copy pigpio "
