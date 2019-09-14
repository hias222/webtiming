rm -f /etc/nginx/sites-enabled/admin
ln -s /etc/nginx/sites-available/admin /etc/nginx/sites-enabled/admin

cd /usr/share/nginx/html/administrator
unzip -o web.zip