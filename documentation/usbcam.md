# Install usb cam on rpi

<https://www.raspberrypi.org/documentation/usage/webcams/>

## Testing

```bash
sudo apt install fswebcam
sudo apt-get install caca-utils -y

sudo usermod -a -G video <username>
```

```bash
fswebcam myimage0.jpg -d /dev/video0
cacaview myimage.jpg
```

## rtsp

<https://siytek.com/raspberry-pi-rtsp-to-home-assistant/>
<https://github.com/mpromonet/v4l2rtspserver>

sudo apt-get install cmake liblog4cpp5-dev libv4l-dev git -y

```bash
git clone https://github.com/mpromonet/v4l2rtspserver.git
cd v4l2rtspserver/
cmake .
make
sudo make install
```

## stream

```bash
v4l2rtspserver -W 640 -H 480 -F 15 -P 8554 /dev/video0
```