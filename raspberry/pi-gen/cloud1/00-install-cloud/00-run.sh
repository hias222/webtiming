#!/bin/bash -e

install -v -o 1000 -g 1000 -d "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/cloud"
install -v -o 1000 -g 1000 -m 744 files/app.zip "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/cloud/"

install -v -o 1000 -g 1000 -m 744 files/.env "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/cloud/.env"

#echo "copy config for global npm"
#install -v -m 666 files/npmrc "${ROOTFS_DIR}/etc/"

echo "install npm global packages"
on_chroot << EOF
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
  su - ${FIRST_USER_NAME} -c "cd cloud; unzip -o app.zip"
  su - ${FIRST_USER_NAME} -c "cd cloud; npm install"
  #
  su - ${FIRST_USER_NAME} -c "cd cloud; pm2 start app.js"
  
  # su - ${FIRST_USER_NAME} -c "pm2 save"
  # pm2 startup ubuntu -u swim --hp /home/swim

  su - ${FIRST_USER_NAME} -c "pm2 stop app"
  # pm2 startup ubuntu -u swim --hp /home/swim

  su - ${FIRST_USER_NAME} -c "pm2 stop app"

  systemctl stop pm2-root.service

  pkill -f node

EOF