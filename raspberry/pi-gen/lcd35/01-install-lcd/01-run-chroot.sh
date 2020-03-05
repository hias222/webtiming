cd /root
unzip -o LCD-show-master.zip > /dev/null
rm LCD-show-master.zip
cd LCD-show-master
# ersetzen reboot
echo " start LCD35-show "
echo "sudo nano /etc/X11/xorg.conf.d/99-calibration.conf 1 -- 0 "
./LCD35-show 2>&1 >> /dev/null