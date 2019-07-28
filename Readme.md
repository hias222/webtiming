# Webtiming for colorado

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
docker run -it -p 1883:1883 -p 9001:9001 -v $(pwd)/mosquitto.conf:/mosquitto/config/mosquitto.conf eclipse-mosquitto

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
```

### Generate some messages

```bash
mosquitto_pub -h localhost -t mainchannel -m hello
```

Use something like postman to send messages

```bash
http://localhost:3001/send-mqtt
```

## Frontends

```bash
datamapping http://localhost:3001/
react http://localhost:3000/
websocket http://localhost:4001/
```

## Deployment

<https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker>

https://mherman.org/blog/dockerizing-a-react-app/

### React

docker build -f Dockerfile -t sample:prod .
docker run -it -p 3000:80 --rm sample:prod

docker run -d -p 3000:80 --rm sample:prod

docker-compose -f docker-compose-prod.yml up -d --build

### Websocket

docker-compose up
