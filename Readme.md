# Webtiming for colorado

## Overview

the software has these components:

* arduino serial converter (not included)
* Mosquito pub/sub -> mosquito (docker)
* backend -> datamapping (Nodejs)
* frontend backend with websocket -> websocket_backend (Nodejs)
* react frontend -> react_fontend/swimfrontend (react, Nodejs)
* scripts for generating RPi image -> raspberry (bash, pi-gen, <https://github.com/RPi-Distro/pi-gen)>
* scripts -> generate packages for RPi pi-gen (bash)

## Installs

### mosquito

<https://hub.docker.com/_/eclipse-mosquitto>
docker pull eclipse-mosquitto

```bash
docker run -it -p 1883:1883 -p 9001:9001 -v mosquitto.conf:/mosquitto/config/mosquitto.conf eclipse-mosquitto

docker run -it -p 1883:1883 -p 9001:9001 -v mosquitto.conf:/mosquitto/config/mosquitto.conf -v /mosquitto/data -v /mosquitto/log eclipse-mosquitto
```

Stay in mosquitto folder:  

```bash
docker run -it -p 1883:1883 -p 9001:9001 -v $(pwd)/mosquitto.conf:/mosquitto/config/mosquitto.conf -v /mosquitto/data -v $(pwd)/log:/mosquitto/log eclipse-mosquitto

docker run -d -p 1883:1883 -p 9001:9001 -v $(pwd)/mosquitto.conf:/mosqtto/config/mosquitto.conf -v /mosquitto/data -v $(pwd)/log:/mosquitto/log eclipse-mosquitto
```

### mosquitto on mac

brew install mosquitto
brew list mosquitto
ln -s /usr/local/Cellar/mosquitto/1.6.3/bin/mosquitto_sub /usr/local/bin/mosquitto_sub

## datamapping

```bash
node app.js
```

## websocket-backend

```bash
npm build
npm start
```

## react-frontend

### folder swimfrontend

```bash
npm build
npm start
```

```bash
 Local:            http://localhost:3000/
```

## Tests

### Subscripe to channel

```bash
mosquitto_sub -h localhost -t mainchannel
mosquitto_sub -h localhost -t rawdata
```

### Generate some messages

```bash
mosquitto_pub -h localhost -t rawdata -m hello
```

Use something like postman to send messages

```bash
http://localhost:3001/send-mqtt
```

### Check with postman

The datamapping backend has a post webservice on send-mqtt

```bash
{message: <stop>/<start>/<lane 1 2 3>}
```

## Frontends

```bash
datamapping http://localhost:3001/
react http://localhost:3000/
websocket http://localhost:4001/
```

## Deployment

### build on raspberry

run script in folder scripts

```bash
creat_apps.sh
```

Create new rspberry image out of pi-gen, create a config file out of example

```bash
./build-docker -c client
```

<https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker>

https://mherman.org/blog/dockerizing-a-react-app/

### React only

React hast two environment files

* .env.development -> for start with npm start
* .env.production -> for prod build with npm build

To build a docker container:

```bash
docker build -f Dockerfile -t sample:prod .
docker run -it -p 3000:80 --rm sample:prod

docker run -d -p 3000:80 --rm sample:prod

docker-compose -f docker-compose-prod.yml up -d --build
```

### Websocket

docker-compose up
