#!/bin/bash -e

on_chroot << EOF
  # systemctl stop pm2-root.service
  echo "node processes"
  ps -ef | grep node

  echo "pm2 processes"
  ps -ef | grep pm2

  echo "stop processes"
  which pkill
  pkill -f node

  echo "node processes"
  ps -ef | grep node

  echo "pm2 processes"
  ps -ef | grep pm2
EOF

echo "end stage 8"