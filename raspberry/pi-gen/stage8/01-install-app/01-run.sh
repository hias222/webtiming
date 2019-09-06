#!/bin/bash -e

install -v -o 1000 -g 1000 -d "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/internal"
install -v -o 1000 -g 1000 -m 744 files/app.zip "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/internal/"

install -v -o 1000 -g 1000 -m 744 files/envazure "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/internal/.env"

echo "install app"
on_chroot << EOF

  su - ${FIRST_USER_NAME} -c "cd internal; unzip -o app.zip"
  su - ${FIRST_USER_NAME} -c "cd internal; npm install"
  #
  su - ${FIRST_USER_NAME} -c "cd internal; pm2 start app.js"
  
EOF
