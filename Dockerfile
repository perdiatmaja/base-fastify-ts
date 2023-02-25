FROM node:16.17.0

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package-lock.json /usr/app
COPY secret-key /usr/app

ADD build /usr/app/build
ADD node_modules /usr/app/node_modules

EXPOSE 80

CMD ["node", "build/index.js"]