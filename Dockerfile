FROM node:19-alpine3.16 AS base

# Creating app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available
COPY package*.json .babelrc .env secret.key ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./src ./src
COPY ./db ./db

CMD ["npm", "start"]