cd /root

echo "install gpio"

unzip pigpio-master.zip

cd pigpio-master
make
make install
echo $PWD

echo "end install gpio"
