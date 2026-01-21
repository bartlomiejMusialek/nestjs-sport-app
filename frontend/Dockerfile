FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g http-server

COPY package*.json ./
RUN npm install --only=development

COPY .. .

EXPOSE 3001

CMD ["npm", "run", "start:dev"]