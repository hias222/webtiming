#!/bin/bash -e

install -v -d "${ROOTFS_DIR}/usr/share/nginx/html/data"

#simpsons2.mp4
install -v -m 644 files/video1.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"
install -v -m 644 files/video2.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"
install -v -m 644 files/video3.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"
install -v -m 644 files/video4.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"
install -v -m 644 files/video5.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"

