FROM node:18.17.1
LABEL authors="isaac"

WORKDIR /backend
COPY package.json .
RUN npm install

COPY . .
CMD npm start