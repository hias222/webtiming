#!/bin/bash -e

install -v -d "${ROOTFS_DIR}/usr/share/nginx/html/data"
install -v -d "${ROOTFS_DIR}/usr/share/nginx/html/download"

#simpsons2.mp4
install -v -m 644 files/video1.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"
install -v -m 644 files/video2.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"
install -v -m 644 files/video3.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"
install -v -m 644 files/video4.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"
install -v -m 644 files/video5.mp4 "${ROOTFS_DIR}/usr/share/nginx/html/data"

install -v -m 644 files/index.html "${ROOTFS_DIR}/usr/share/nginx/html/download"

install -v -m 644 files/node-v12.16.3-x86.msi "${ROOTFS_DIR}/usr/share/nginx/html/download"
install -v -m 644 files/nginx-1.17.10.zip "${ROOTFS_DIR}/usr/share/nginx/html/download"
install -v -m 644 files/mosquitto-1.6.9-install-windows-x86.exe "${ROOTFS_DIR}/usr/share/nginx/html/download"

