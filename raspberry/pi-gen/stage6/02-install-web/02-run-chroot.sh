
su - ${FIRST_USER_NAME} -c "cd frontend; unzip -o app.zip"
su - ${FIRST_USER_NAME} -c "cd frontend; npm install"

## startup pm2
pm2 startup ubuntu -u swim --hp /home/swim

## add frontend
su - ${FIRST_USER_NAME} -c "cd frontend; pm2 start app.js --name frontend"

## add monitor
su - ${FIRST_USER_NAME} -c "cd monitor; pm2 start app.js --name monitor"

echo "save ..."
su - ${FIRST_USER_NAME} -c "pm2 save"

su - ${FIRST_USER_NAME} -c "pm2 stop all"
# su - ${FIRST_USER_NAME} -c "cd backend; pm2 stop backend"
# su - ${FIRST_USER_NAME} -c "cd monitor; pm2 stop monitor"

echo "kill process ... "
pkill -f node
sleep 10

echo "process list ... "
ps -ef 