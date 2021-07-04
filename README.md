#### RESUME SYSTEM

### Step 1 - Node Modules

The first thing you need to do to get this app working is to install the Node modules with the following command:

    npm install
    
### Step 2 - Authenticate mongoose connection

Change the environment varible ```DB_CONNECT``` with your username, password and host name in the appropriate places.

### Step 3 - Running the App

    npm start

It will start the Node back end server at http://localhost:3035, with Nodemon, so that updates happen automatically on save. 

### Consolidated Steps
```bash
sudo apt-get update
sudo apt-get install git nodejs npm

# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
# Start mongo

git clone https://github.com/abinpaul1/resume-management-system

cd resume-management-system

# Setup  .env file similar to sample.env:

npm install

sudo npm install pm2 -g
pm2 status
pm2 startup   ## Copy the command given as output and run
	
pm2 start app.js

```


### API end points

To register users : 

    http://localhost:3035/api/candidate/
    

To view all the users : 

    http://localhost:3035/api/candidate/list [GET]


To edit the user : 

    http://localhost:3035/api/candidate/edit/:id [GET]
   
### Mongodb (Bash):

```bash
mongo
```

```bash
use resume-system
```

```bash
show tables
```



## Docker Run For Development

```bash
# Run in Docker : mapped to localhost:85
#
docker-compose up --build
# use -d flag to run in background

# To execute inside container
docker exec -t -i <container-id> /bin/sh

# Use python script to populate the database
```