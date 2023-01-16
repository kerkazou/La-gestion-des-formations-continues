FROM node:16
WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 1111
CMD [ "node", "index.js" ]