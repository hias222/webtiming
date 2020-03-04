cd /root

echo "install npm"

tar -xf node-v12.16.1-linux-armv7l.tar.xz
echo $PWD
ls 
rm node-v12.16.1-linux-armv7l.tar.xz
cd node-v12.16.1-linux-armv7l
echo $PWD
ls
cp -R * /usr/local/
ls -la /usr/local/bin/npm

echo "end install npm"
