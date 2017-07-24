# Development

FROM node:7.3.0

RUN npm install -g nodemon
RUN npm install -g yarn

RUN apt-get update && apt-get install -y postgresql

# package.json changes will require image rebuild that way
RUN mkdir -p /usr/src/journal
ADD package.json /usr/src/journal/package.json

ADD wait-for-it.sh /usr/src/journal/wait-for-it.sh
RUN chmod +x /usr/src/journal/wait-for-it.sh


WORKDIR /usr/src/journal
RUN yarn
#RUN sudo npm run build
CMD ./node_modules/.bin/webpack

