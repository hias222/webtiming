#!/bin/bash -e

echo "install serial"

on_chroot << EOF
  #
  su - ${FIRST_USER_NAME} -c "rm -rf serial"
  su - ${FIRST_USER_NAME} -c "git clone https://github.com/hias222/serial.git"
  #
  su - ${FIRST_USER_NAME} -c "mkdir -p serial/build"
  #
  su - ${FIRST_USER_NAME} -c "cd serial/build; cmake ../"
  # 
  su - ${FIRST_USER_NAME} -c "cd serial/build; cmake --build ."

  cp /home/${FIRST_USER_NAME}/serial/build/serial /usr/bin/colorado
  systemctl enable colorado.service

EOF
echo "end install serial"