FROM node:latest

WORKDIR /usr/apps/btodo-frontend

COPY ./  ./

COPY ./.env.docker ./.env.local

RUN npm install