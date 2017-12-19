FROM node:latest
ENV NODE_ENV production
ENV DISCORD_TOKEN MjYyNTk5ODA5MzQ3NzQ3ODQy.C3tWzg.kRJQTJDqcc85USoGPgbghFpxe-4
ENV EVE_CLIENT_ID=52051e61f940445591822159d8e958d9
ENV EVE_CLIENT_SECRET=SuY41E0dgsDPAwNQQn9fFAe23B03L5WIedRbZc4Z
ENV MONGODB_URI=mongodb://heroku_szkmsdmg:c5cbajmha62hpn53o74ob7kb0v@ds135049.mlab.com:35049/heroku_szkmsdmg

WORKDIR /opt/app/eve-discord-bot
COPY "./dist" "./"
RUN yarn --prod
EXPOSE 80
CMD npm start