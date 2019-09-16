#!/bin/bash -e

install -v -d "${ROOTFS_DIR}/usr/share/nginx/html/data"
install -v -m 644 files/simpsons.mov "${ROOTFS_DIR}/usr/share/nginx/html/data"
