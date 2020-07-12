cd /root

echo "install npm v12.18.2"
tar -xf node-v12.18.2-linux-armv7l.tar.xz
echo $PWD
ls 
rm node-v12.18.2-linux-armv7l.tar.xz
cd node-v12.18.2-linux-armv7l
echo $PWD
cp -R * /usr/local/
ls -la /usr/local/bin/npm | wc -l

echo "end install npm"
