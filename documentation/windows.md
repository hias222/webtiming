# Windows

## install npm

Install node.js `12.16.2`  
<https://nodejs.org/en/download/>

## instal mqtt

Install 1.6.9  
<https://projects.eclipse.org/projects/iot.mosquitto>  
check with mosquitto_sub -t raw, if its running (files under c:\program\mosquitto)

## install nginx

<https://www.nginx.org>
copy build react app in html folder

## using pm2

* Create a new folder `c:\etc\.pm2`
* Create a new PM2_HOME variable (at System level, not User level) and set the value c:\etc\.pm2
* Close all your open terminal windows (or restart Windows)
* Ensure that your PM2_HOME has been set properly, running `echo %PM2_HOME%`