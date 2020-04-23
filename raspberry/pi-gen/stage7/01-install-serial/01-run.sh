#!/bin/bash -e

install -v -m 744 files/pigpio-master.zip "${ROOTFS_DIR}/root"
install -v -m 744 files/colorado.service "${ROOTFS_DIR}/etc/systemd/system"

echo "copy pigpio "
