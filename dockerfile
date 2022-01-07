FROM node:16.13.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./api/package*.json /usr/src/app/
RUN npm install
COPY ./api/ /usr/src/app/

EXPOSE 3001

CMD npm run start