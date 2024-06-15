FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN apk add --update nodejs npm

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "build"]