su - ${FIRST_USER_NAME} -c "cd frontend; unzip -o app.zip"
su - ${FIRST_USER_NAME} -c "cd frontend; npm install"
#
su - ${FIRST_USER_NAME} -c "cd frontend; pm2 start app.js"

## add monitor
su - ${FIRST_USER_NAME} -c "cd monitor; pm2 start app.js"

su - ${FIRST_USER_NAME} -c "pm2 list"
#
su - ${FIRST_USER_NAME} -c "pm2 save"

# pm2 startup systemd
#sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u swim --hp /home/swim

pm2 startup ubuntu -u swim --hp /home/swim

su - ${FIRST_USER_NAME} -c "pm2 stop app"
# su - ${FIRST_USER_NAME} -c "cd backend; pm2 stop app"

systemctl stop pm2-root.service

pkill -f node

ps -ef | grep node