FROM node:18.12-alpine3.15
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE  8000
CMD ["node", "index.js"]