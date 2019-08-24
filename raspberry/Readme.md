# Install raspberry

## pi-gen

```bash
git clone https://github.com/RPi-Distro/pi-gen
```

The config isn`t sourced ?!?
Run source config before start

## change packages

```bash
touch ./stage3/SKIP ./stage4/SKIP ./stage5/SKIP
touch ./stage4/SKIP_IMAGES ./stage5/SKIP_IMAGES
```

## Install Image

```bash
https://www.raspberrypi.org/documentation/installation/installing-images/
```

## add some code

- mqtt
- nodejs

/Users/matthiasfuchs/projects/schwimmen/webtiming/datamapping
zip ../../raspberry/pi-gen/stage6/01-install-app/files/app.zip app.js package.json incoming/* mqtt/* data/* resources/*
