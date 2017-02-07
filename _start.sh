tsc -w & \
cross-env \
DISCORD_TOKEN=<token> \
EVE_CLIENT_ID=<client_id> \
EVE_CLIENT_SECRET=<client_secret> \
nodemon --debug ./bin/www \