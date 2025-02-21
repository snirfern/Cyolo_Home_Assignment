FROM node:20.12.0-alpine

WORKDIR /usr/src/app

COPY backend/ ./

ARG NODE_ENV=qa
ENV NODE_ENV=${NODE_ENV}

RUN if [ "$NODE_ENV" = "test" ]; then mkdir -p /usr/src/app/test-results; fi
RUN if [ "$NODE_ENV" = "prod" ]; then npm install --omit=dev; else npm install; fi


RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
