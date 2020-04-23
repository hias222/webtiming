#!/bin/bash -e

echo "install serial"
on_chroot << EOF
  #
  su - ${FIRST_USER_NAME} -c "git clone https://github.com/hias222/serial.git"
  #
  su - ${FIRST_USER_NAME} -c "mkdir -p serial/build"
  #
  su - ${FIRST_USER_NAME} -c "cd serial/build; cmake ../"
  # 
  su - ${FIRST_USER_NAME} -c "cd serial/build; cmake --build ."

EOF
echo "end install serial"