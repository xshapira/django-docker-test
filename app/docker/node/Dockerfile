FROM node:12-stretch-slim

WORKDIR /usr/src/app

COPY ./app/package.json /usr/src/app

# RUN npm install && npm cache clean --force \
RUN npm install -g gulp \
    && npm install gulp

ENV PATH ./node_modules/.bin/:$PATH
