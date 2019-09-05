#!/bin/bash -e

echo "bind"

# install -v -d "${ROOTFS_DIR}/etc/bind"
install -v -m 744 files/named.conf.local "${ROOTFS_DIR}/etc/bind/"
install -v -m 744 files/db.fakeroot "${ROOTFS_DIR}/etc/bind/"

echo "install npm global packages"
on_chroot << EOF
  systemctl enable bind9.service 
EOF
