FROM node:20.12.0-alpine

WORKDIR /usr/src/app

COPY backend/package*.json ./
COPY backend/ ./

ARG NODE_ENV=qa
ENV NODE_ENV=${NODE_ENV}

RUN if [ "$NODE_ENV" = "test" ]; then mkdir -p /usr/src/app/test-results; fi
RUN if [ "$NODE_ENV" = "prod" ]; then npm install --omit=dev; else npm install; fi

RUN mkdir -p /usr/src/app/test-results

RUN npm install uuid

RUN npm run build

RUN mkdir -p /usr/src/app/test-results

EXPOSE 3001

CMD ["npm", "run", "start"]
