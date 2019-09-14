#!/bin/bash -e

install -v -d "${ROOTFS_DIR}/usr/share/nginx/html/administrator"
install -v -m 644 files/web.zip "${ROOTFS_DIR}/usr/share/nginx/html/administrator"

install -v -m 644 files/admin "${ROOTFS_DIR}/etc/nginx/sites-available/"