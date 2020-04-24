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
* monitor

## Install for RP

[install image](scripting/install.md)

## Installs

[overall][documentation/Readme.md]

### Raspberry

[RPi][documentation/rpi.md]