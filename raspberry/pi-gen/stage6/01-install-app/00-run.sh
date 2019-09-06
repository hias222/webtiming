#!/bin/bash -e

install -v -o 1000 -g 1000 -d "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/backend"
install -v -o 1000 -g 1000 -m 744 files/app.zip "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/backend/"

install -v -o 1000 -g 1000 -m 744 files/envlocal "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/backend/.env"

#echo "copy config for global npm"
#install -v -m 666 files/npmrc "${ROOTFS_DIR}/etc/"

echo "install npm global packages"
on_chroot << EOF
  systemctl enable mosquitto.service
  #
  npm config set unsafe-perm true
  echo "npm starts"
  npm install express -g
  npm install mqtt -g
  npm install jmespath -g
  npm install pm2 -g
  #
EOF

echo "install app"
on_chroot << EOF
  su - ${FIRST_USER_NAME} -c "cd backend; unzip -o app.zip"
  su - ${FIRST_USER_NAME} -c "cd backend; npm install"
  #
  su - ${FIRST_USER_NAME} -c "cd backend; pm2 start app.js"
  
EOF
