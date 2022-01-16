FROM node:14-alpine

EXPOSE 3000

ADD ./ /app

WORKDIR /app

RUN npm install
RUN rm -Rf dist && npm run build

CMD sleep 10 && npm run typeorm migration:run && node dist/src/infrastructure/api/index.js
