FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 1111

CMD [ "node", "start" ]