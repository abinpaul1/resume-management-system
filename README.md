#### PRIME RESUME SYSTEM

### Step 1 - Node Modules

The first thing you need to do to get this app working is to install the Node modules with the following command:

    npm install
    
### Step 2 - Authenticate mongoose connection

Change the environment varible ```DB_CONNECT``` with your username, password and host name in the appropriate places.

### Step 3 - Running the App

    npm start

It will start the Node back end server at http://localhost:3035, with Nodemon, so that updates happen automatically on save. 

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



## Docker Run

### Setting mongo authentication in docker mongo

Change the mongo container environment variables```MONGO_INITDB_ROOT_USERNAME```,```MONGO_INITDB_ROOT_PASSWORD``` to your mongodb username, password respectively in the docker-compose.yml file.

```bash
# Run in Docker
docker-compose up
# use -d flag to run in background
```

```bash
# Tear down
docker-compose down
```

```bash
# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']
```

```bash
# To re-build
docker-compose build
```

