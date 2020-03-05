#!/bin/bash -e
echo "install app"
on_chroot << EOF

echo "repair apt .. "
apt --fix-broken install

echo "update .. "
apt-get update -y 

echo "rmosquitto .. "
apt-get install mosquitto -y

EOF