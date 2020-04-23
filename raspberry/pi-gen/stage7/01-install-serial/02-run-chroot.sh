cd /root

echo "install gpio"

unzip -o pigpio-master.zip

cd pigpio-master
make
make install
echo $PWD

echo "end install gpio"

# sudo apt-get update
# sudo apt-get install pigpio python-pigpio python3-pigpio