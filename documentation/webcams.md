# Webcams

## choose the right cam

<https://www.epiphan.com/blog/best-cameras-for-live-streaming

## HDMI

For best quality use HDMI with converter into OBS

## RTSP

<https://github.com/mpromonet/v4l2rtspserver.git>

Installation scripts  
<https://github.com/hias222/ansibleswim/tree/master/roles/webcam>

## WebRTC

<https://www.linux-projects.org/2020/12/28/new-ai-module-for-uv4l-an-example-of-real-time-video-tracking-out-of-the-box/>  
<https://www.highvoltagecode.com/post/webrtc-on-raspberry-pi-live-hd-video-and-audio-streaming>

## install webcam

<https://github.com/hias222/ansibleswim/blob/master/roles/webcam/tasks/webrtc.yml>

## uv4l prerequisites

* ubuntu 20 23bit - wrong libssl lib (2020/12)
* ubuntu 20 64bit - no uv4l version avaialable (2020/12)
* raspian 32 bit OK
* ubuntu 18 32bit (Bionic Beaver) error on startup
  
### dmesg

#### 32bit

[  432.687499] usb 1-1.3: USB disconnect, device number 4
[  453.063004] usb 1-1.3: new high-speed USB device number 6 using xhci_hcd
[  453.168877] usb 1-1.3: New USB device found, idVendor=2aad, idProduct=6353, bcdDevice= 1.00
[  453.168886] usb 1-1.3: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[  453.168893] usb 1-1.3: Product: iCatchtek SPCA6350
[  453.168900] usb 1-1.3: Manufacturer: iCatchtek Co Ltd 
[  453.168906] usb 1-1.3: SerialNumber: 01.00.00
[  453.170363] uvcvideo: Found UVC 1.00 device iCatchtek SPCA6350 (2aad:6353)
[  453.180146] uvcvideo 1-1.3:1.0: Entity type for entity Extension 3 was not initialized!
[  453.180157] uvcvideo 1-1.3:1.0: Entity type for entity Processing 2 was not initialized!
[  453.180165] uvcvideo 1-1.3:1.0: Entity type for entity Camera 1 was not initialized!
[  453.180355] input: iCatchtek SPCA6350 as /devices/platform/scb/fd500000.pcie/pci0000:00/0000:00:00.0/0000:01:00.0/usb1/1-1/1-1.3/1-1.3:1.0/input/input1
[  453.181238] usb 1-1.3: 4:6 : no or invalid class specific endpoint descriptor

#### 64bit

[  211.776514] usb 1-1.3: new high-speed USB device number 3 using xhci_hcd
[  211.879314] usb 1-1.3: New USB device found, idVendor=2aad, idProduct=6353, bcdDevice= 1.00
[  211.879321] usb 1-1.3: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[  211.879326] usb 1-1.3: Product: iCatchtek SPCA6350
[  211.879330] usb 1-1.3: Manufacturer: iCatchtek Co Ltd 
[  211.879334] usb 1-1.3: SerialNumber: 01.00.00
[  211.934164] uvcvideo: Found UVC 1.00 device iCatchtek SPCA6350 (2aad:6353)
[  211.946035] uvcvideo 1-1.3:1.0: Entity type for entity Extension 3 was not initialized!
[  211.946045] uvcvideo 1-1.3:1.0: Entity type for entity Processing 2 was not initialized!
[  211.946050] uvcvideo 1-1.3:1.0: Entity type for entity Camera 1 was not initialized!
