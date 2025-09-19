FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT_NODE

CMD ["node", "index.js"]