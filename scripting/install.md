# Installation

## Arduino/ESP

Install the required file, add the destination for MQTT

## RP

Create or Download the RP Image
* Install with dd see script create_dd.sh
* Install wit balenaetcher

## First Startup

Start the RP, WLAN is configured during Image creation, if you use the image only use a lan cable  

* connect to the rpi

```bash
ssh swim@<IP>
password: swim
```

* nginx and MQTT starts with system
* node applications don't start at the moment (bug of image creation)

```bash
# cd to one node app
cd backend
pm2 start app.js
```

* check node running

```bash
pm2 list
```

Shoul look like this

```bash
swim@raspberrypi:~ $ pm2 list
┌────┬────────────────────┬──────────┬──────┬──────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status   │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼──────────┼──────────┼──────────┤
│ 0  │ app                │ fork     │ 0    │ online   │ 0.3%     │ 43.9mb   │
│ 1  │ app                │ fork     │ 0    │ online   │ 0.7%     │ 42.0mb   │
│ 2  │ app                │ fork     │ 0    │ online   │ 0.5%     │ 39.5mb   │
└────┴────────────────────┴──────────┴──────┴──────────┴──────────┴──────────┘
```

processes

```bash
swim@raspberrypi:~ $ ps -ef | grep node
swim       520   509  2 10:33 ?        00:00:05 node /home/swim/backend/app.js
swim       527   509  2 10:33 ?        00:00:04 node /home/swim/frontend/app.js
swim       534   509  1 10:33 ?        00:00:03 node /home/swim/monitor/app.js
swim       838   819  0 10:37 pts/0    00:00:00 grep --color=auto node
```

* save the state for the next startup

```bash
pm2 save
```

```bash
[PM2] Saving current process list...
[PM2] Successfully saved in /home/swim/.pm2/dump.pm2
```

* to check log use

```bash
pm2 log
```

* to start azure connect

```bash
cd cloud
vi .env
--> edit connection secret (IoT key)
pm2 start app.js
--> check with pm2 log
```

## Urls

### Main

THere are two modes, the prefered mode can configured during build of react app, base is static
http://[IP Address]

#### For static use

http://[IP Address>]/static

#### For web

http://[IP Address]/responsive

### Admin

http://[IP]:8080/

You can upload new lenex file under settings, if cloud is connected, this part is also updated  

### MQTT logs

http://[IP]:3002/ - no automatic update, browser refresh must be used

this is an monitoring app. It collects the last messages and put it to website - no auto reload!! When a arduino/esp connects you see somethin like MQTT started an ever few seconds something like no serial data