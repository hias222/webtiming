cd /root
unzip -o LCD-show-master.zip > /dev/null
rm LCD-show-master.zip
cd LCD-show-master
# ersetzen reboot
echo " start LCD35-show "
./LCD35-show 2>&1 >> /dev/null