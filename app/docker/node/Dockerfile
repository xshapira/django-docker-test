FROM node:12.22-buster-slim

RUN npm i npm@latest -g \
    && npm install -g gulp

RUN apt-get update && apt-get install -y --no-install-recommends \
    autoconf \
    automake \
    g++ \
    libpng-dev \
    make\
    nasm \
    -y wget \
    && wget -q -O /tmp/libpng12.deb http://mirrors.kernel.org/ubuntu/pool/main/libp/libpng/libpng12-0_1.2.54-1ubuntu1_amd64.deb \
    && dpkg -i /tmp/libpng12.deb \
    && rm /tmp/libpng12.deb

WORKDIR /usr/src

COPY ./app/package*.json ./

RUN npm ci

ENV PATH /usr/src/node_modules/.bin/:$PATH

WORKDIR /usr/src/app

COPY . .
