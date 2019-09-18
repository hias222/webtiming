#!/bin/bash -e

install -v -d "${ROOTFS_DIR}/usr/share/nginx/html/data"
install -v -m 644 files/simpsons.mov "${ROOTFS_DIR}/usr/share/nginx/html/data"

#simpsons2.mp4
install -v -m 644 files/simpsons2.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"

#samo.mp4
install -v -m 644 files/samo.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"
