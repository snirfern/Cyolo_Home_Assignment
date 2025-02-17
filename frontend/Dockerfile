FROM node:20.12.0-alpine

WORKDIR /usr/src/app

COPY frontend/package*.json ./

RUN npm cache clean --force
RUN npm install --legacy-peer-deps


COPY frontend/ ./

RUN npm run build



RUN npm install -g serve


EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
