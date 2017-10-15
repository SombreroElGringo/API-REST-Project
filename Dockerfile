FROM node:alpine

RUN mkdir -p /app

COPY . /app
COPY package.json /app
COPY .env.secret /app

WORKDIR /app

RUN npm install
RUN npm rebuild node-sass --force

EXPOSE 3000
CMD ["npm","start"]
