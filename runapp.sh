#!/bin/bash

npm install -g pm2
npm install
npm install nodemon
pm2 start dist/app.js
