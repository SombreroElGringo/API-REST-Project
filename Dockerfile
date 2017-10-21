FROM node:alpine

RUN mkdir -p /app

COPY . /app
COPY package.json /app
COPY .env.secret /app

WORKDIR /app

RUN npm install

EXPOSE 3000
CMD ["npm","start"]
