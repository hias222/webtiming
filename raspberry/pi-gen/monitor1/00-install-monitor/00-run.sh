#!/bin/bash -e

install -v -o 1000 -g 1000 -d "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/monitor"
install -v -o 1000 -g 1000 -m 744 files/app.zip "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/monitor/"

install -v -o 1000 -g 1000 -m 744 files/envlocal "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/monitor/.env"

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
  su - ${FIRST_USER_NAME} -c "cd monitor; unzip -o app.zip"
  su - ${FIRST_USER_NAME} -c "cd monitor; npm install"
  su - ${FIRST_USER_NAME} -c "cd monitor; pm2 start app.js"

  echo "persist config .. "
  
  su - ${FIRST_USER_NAME} -c "pm2 save"

  echo "root actions ... "

  pm2 startup ubuntu -u swim --hp /home/swim
  pm2 save

  systemctl enable pm2-swim
  # systemctl stop pm2-swim --> Running in chroot, ignoring request: stop

su - ${FIRST_USER_NAME} -c "pm2 stop app"
echo "kill process ... "
pkill -f node
sleep 10

echo "process list ... "
ps -ef 

EOF