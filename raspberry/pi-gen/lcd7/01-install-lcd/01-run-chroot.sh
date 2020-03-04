cd /root
unzip -o LCD-show-master.zip > /dev/null
rm LCD-show-master.zip
cd LCD-show-master
# ersetzen reboot
echo " start LCD35-show "
# ./LCD35-show 2>&1 >> /dev/null

# hdmi_group=2
# hdmi_mode=1
# hdmi_mode=87
# hdmi_cvt 1024 600 60 6 0 0 0
# max_usb_current=1 

echo "hdmi_group=2" >> ./boot/config
echo "hdmi_mode=1" >> ./boot/config
echo "hdmi_mode=87" >> ./boot/config
echo "hdmi_cvt 1024 600 60 6 0 0 0" >> ./boot/config
echo "max_usb_current=1" >> ./boot/config
