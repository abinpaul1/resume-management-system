FROM node:10.19.0
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "start"]

## This dockerfile, docker-compose is to be used only for dev environments
## Make sure to change `node app.js` to 'nodemon' in package.json for live reloads during dev
## docker-compose up --build
## Use python script to populate the database as well
## Note consider using cookie-session with express to persist sessions for longer developments
## -- https://stackoverflow.com/questions/29947749/preserving-session-between-node-js-server-reboots    