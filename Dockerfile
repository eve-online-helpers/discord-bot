FROM node:latest

WORKDIR /opt/app/eve-discord-bot
COPY ".dist" "./"

RUN yarn --prod
EXPOSE 80
CMD npm start