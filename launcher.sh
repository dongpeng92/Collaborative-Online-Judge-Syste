#!/bin/bash
sudo fuser -k 3000/tcp
sudo fuser -k 5000/tcp

sudo service redis_6379 start
cd ./oj-server
npm install
nodemon server.js &
cd ../oj-client
npm install
ng build --watch &
cd ../executor
pip install -r requirements.txt
python executor_server.py &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

sudo fuser -k 3000/tcp
sudo fuser -k 5000/tcp
sudo service redis_6379 stop
