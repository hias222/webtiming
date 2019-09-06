#!/bin/bash -e

install -v -o 1000 -g 1000 -d "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/frontend"
install -v -o 1000 -g 1000 -m 644 files/app.zip "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/frontend/"

# echo "copy config for global npm"
# install -v -m 666 files/npmrc "${ROOTFS_DIR}/etc/"

echo "install npm global packages"
on_chroot << EOF
  systemctl enable mosquitto.service
  #
  echo "npm starts"
  npm config set unsafe-perm true
  npm install express -g
  npm install mqtt -g
  npm install jmespath -g
  npm install pm2 -g
  #
EOF

on_chroot << EOF
  systemctl enable nginx.service 
  systemctl start pm2-root.service
EOF

install -v -m 644 files/web.zip "${ROOTFS_DIR}/usr/share/nginx/html"

install -v -m 644 files/default "${ROOTFS_DIR}//etc/nginx/sites-available/"