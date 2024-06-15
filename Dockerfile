FROM node:18 AS build

WORKDIR /app

COPY package*.json./

RUN npm install

COPY..

RUN npm run build

FROM node:18-slim

WORKDIR /app

COPY --from=build /app/build./build
COPY --from=build /app/public./public
COPY --from=build /app/package*.json./

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"]